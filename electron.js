const { app, Menu, Tray, BrowserWindow } = require('electron')
let bigAppList = []
let tray = null

app.whenReady().then(() => {
    // Tray configuration
    tray = new Tray('img/icons/icon.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Créer un nouvel espace de travail', type: 'normal', click() { newWorkspaceWindow() }},
        { label: 'Fermer tous les logiciels ouverts', type: 'normal', click() { closeAllOpenedApp() }},
        { type: 'separator' },
        
        { label: 'workspace 1', type: 'normal', click() { openWorkspace() }},
        { label: 'workspace 2', type: 'normal' },
        { label: 'workspace 3', type: 'normal' },
        { label: 'workspace 4', type: 'normal' },
        { label: 'workspace 5', type: 'normal' },

        { type: 'separator' },
        { label: 'Préférences...', type: 'normal', click() { createWindow('preferences') }},
        { label: 'À propos', type: 'normal', click() { createWindow('about') }},
        { type: 'separator' },
        { label: 'Quitter', type: 'normal', click() { app.quit() }}
    ])
    tray.setToolTip('Workspace Saver')
    tray.setContextMenu(contextMenu)

    // Hide icon in dock
    app.dock.hide()
})

function newWorkspaceWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    startServer()
    win.loadURL('http://localhost:3000/')
}

function startServer() {
    const open = require('open')
    
    // Server initiation
    const express = require('express')
    const app = express()
    app.listen(3000, () => { console.log('Server started') })
    
    app.use(express.static('public'))
    app.use(express.text())
    
    // Get all applications of the user
    searchForApp('Applications')
    searchForApp('System/Applications')
    searchForApp('System/Applications/Utilities')
    
    // Give the list of all applications to client side
    app.get('/api/appList', (req, res) => {
        res.send(JSON.stringify(bigAppList))
    })
    
    app.post('/api/appList', (req, res) => {
        open(`/${req.body}`)
    })
}

function searchForApp(directory) {
    // Search applications in a specific directory
    const exec = require('child_process').exec
    
    exec('ls', { cwd: `/${directory}`}, (error, data, getter) => {
        let appList = data.split('\n')
    
        for (let i = 0; i < appList.length; i++) {
            const app = appList[i];
            let regExp = new RegExp('\.app$')
    
            if (regExp.test(app)) {
                createObject(`${directory}/${app}`)
            }
        }
    })
}

function createObject(fullAppPath) {
    // Create an object with the name and the path of an application
    let newPath = fullAppPath.replace('.app', '')
    let newName = newPath.split('/')
    let name = newName[newName.length - 1]

    let obj = {
        "name": name,
        "path": fullAppPath
    }

    bigAppList.push(obj)
}

function closeAllOpenedApp () {
    
}

function createWindow (fileName) {
    const win = new BrowserWindow({
        width: fileName === 'about' ? 300 : 300,
        height: fileName === 'about' ? 300 : 500,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile(`public/${fileName}.html`)
}