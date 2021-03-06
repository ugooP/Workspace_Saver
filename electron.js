const { app, Menu, Tray, BrowserWindow } = require('electron')
const fs = require('fs')
const server = require('./private/server')
const openWorkspace = require('./private/openWorkspace')
let tray = null

// Hide icon in dock
app.dock.hide()

app.on('ready', () => {
    // Tray initiation
    tray = new Tray('public/img/icons/icon.png')
    const contextMenu = Menu.buildFromTemplate(getContextMenuTemplate())
    tray.setToolTip('Workspace Saver')
    tray.setContextMenu(contextMenu)

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
})
function getContextMenuTemplate() {
    let contextMenuTemplate = [
        { label: 'Gérer', type: 'normal', click() { manageWorkspaces() }},
        { label: 'Nouvel espace de travail', type: 'normal', click() { newWorkspaceWindow() }},
        { label: 'Fermer tous les logiciels ouverts', type: 'normal', click() { closeAllOpenedApp() }},
        { type: 'separator' },
        { label: 'Rafraichir la liste', type: 'normal', click() { refreshMenu() }},
        { type: 'separator' },
        // --------------------------------------
        // ------- Insert workspaces here -------
        // --------------------------------------
        { type: 'separator' },
        { label: 'Préférences...', type: 'normal', click() { createWindow('preferences') }},
        { label: 'À propos', type: 'normal', click() { createWindow('about') }},
        { type: 'separator' },
        { label: 'Restart', type: 'normal', click() { app.relaunch(); app.quit() }},
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
    let index = 6
    for (let k = 0; k < workspaceObjects.length; k++) {
        contextMenuTemplate.splice(index, 0, workspaceObjects[k])
        index++
    }
    return contextMenuTemplate
}
function manageWorkspaces() {
    const win = new BrowserWindow({
        width: 500,
        height: 700,
        maximizable: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('public/html/manageWorkspaces.html')
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

    server.start
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
    win.loadFile(`public/html/${fileName}.html`)
}
function refreshMenu() {
    tray.closeContextMenu()
    const contextMenu = Menu.buildFromTemplate(getContextMenuTemplate())
    tray.setContextMenu(contextMenu)
}