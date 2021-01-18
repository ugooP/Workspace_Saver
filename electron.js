const { app, Menu, Tray, BrowserWindow } = require('electron')
const fs = require('fs')
const server = require('./private/server')
let tray = null

// Hide icon in dock
app.dock.hide()

app.whenReady().then(() => {
    // Tray configuration
    tray = new Tray('public/img/icons/icon.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Créer un nouvel espace de travail', type: 'normal', click() { newWorkspaceWindow() }},
        { label: 'Fermer tous les logiciels ouverts', type: 'normal', click() { closeAllOpenedApp() }},
        { type: 'separator' },
        
        displayWorkspacesInContextMenu(),

        { type: 'separator' },
        { label: 'Préférences...', type: 'normal', click() { createWindow('preferences') }},
        { label: 'À propos', type: 'normal', click() { createWindow('about') }},
        { type: 'separator' },
        { label: 'Quitter', type: 'normal', click() { app.quit() }}
    ])
    tray.setToolTip('Workspace Saver')
    tray.setContextMenu(contextMenu)
})

function displayWorkspacesInContextMenu() {
    let workspaceName
    fs.readdirSync('save', (err, files) => {
        for (let i = 0; i < files.length; i++) {
            fs.readFileSync(`save/${files[i]}`, (data) => {
                let workspaceData = JSON.parse(data)
                workspaceName = workspaceData.workspaceName
                console.log(workspaceName);
            })
        }
    })

    let x = { label: workspaceName, type: 'normal' }
    return x 
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