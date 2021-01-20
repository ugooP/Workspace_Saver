const { app, Menu, Tray, BrowserWindow } = require('electron')
const fs = require('fs')
const server = require('./private/server')
let tray = null

// Hide icon in dock
app.dock.hide()

app.whenReady().then(() => {

    tray = new Tray('public/img/icons/icon.png')
    const contextMenu = Menu.buildFromTemplate(getContextMenuTemplate())
    tray.setToolTip('Workspace Saver')
    tray.setContextMenu(contextMenu)
})

function getContextMenuTemplate() {
    let contextMenuTemplate = [
        { label: 'Créer un nouvel espace de travail', type: 'normal', click() { newWorkspaceWindow() }},
        { label: 'Fermer tous les logiciels ouverts', type: 'normal', click() { closeAllOpenedApp() }},
        { type: 'separator' },
        // --------------------------------------
        // ------- Insert Workspaces here -------
        // --------------------------------------
        { type: 'separator' },
        { label: 'Préférences...', type: 'normal', click() { createWindow('preferences') }},
        { label: 'À propos', type: 'normal', click() { createWindow('about') }},
        { type: 'separator' },
        { label: 'Quitter', type: 'normal', click() { app.quit() }}
    ]

    let workspaceObjects = []

    let files = fs.readdirSync('save')
    for (let i = 0; i < files.length; i++) {
        if (files[i] !== '.DS_Store') {
            // Get workspace's names
            let data = fs.readFileSync(`save/${files[i]}`)
            let workspaceData = JSON.parse(data)
            // Get workspace's index
            let workspaceIndex = files[i].match(/[0-9]+/)
            // Create the workspace's object
            const obj = { label: workspaceData.workspaceName, type: 'normal', click() { openWorkspace(workspaceIndex[0]) }}
            workspaceObjects.push(obj);
        }
    }

    // Insert each workspace object in the contextMenuTemplate
    let index = 3
    for (let k = 0; k < workspaceObjects.length; k++) {
        contextMenuTemplate.splice(index, 0, workspaceObjects[k])
        index++
    }
    return contextMenuTemplate
}

function newWorkspaceWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        maximizable: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    })

    server.startServer
    win.loadURL('http://localhost:3000/')
}

function closeAllOpenedApp () {
    
}

function createWindow (fileName) {
    const win = new BrowserWindow({
        width: fileName === 'about' ? 300 : 300,
        height: fileName === 'about' ? 300 : 500,
        resizable: false,
        maximizable: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            devTools: false,
        }
    })
    win.loadFile(`../public/html/${fileName}.html`)
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})