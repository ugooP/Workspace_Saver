const { app, Menu, Tray, BrowserWindow } = require('electron')

function createWindow () {
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
    const exec = require('child_process').exec
    const open = require('open')
    
    // Server initiation
    const express = require('express')
    const app = express()
    app.listen(3000, () => { console.log('Server started') })
    
    app.use(express.static('public'))
    app.use(express.text())
    
    // Get all applications of the user
    let bigAppList = []
    searchForApp('Applications')
    searchForApp('System/Applications')
    searchForApp('System/Applications/Utilities')
    
    function searchForApp(directory) {
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
        
        let newPath = fullAppPath.replace('.app', '')
        let newName = newPath.split('/')
        let name = newName[newName.length - 1]
    
        let obj = {
            "name": name,
            "path": fullAppPath
        }
    
        bigAppList.push(obj)
    }
    
    app.get('/api/appList', (req, res) => {
        res.send(JSON.stringify(bigAppList))
    })
    
    app.post('/api/appList', (req, res) => {
        open(`/${req.body}`)
    })
}

let tray = null
app.whenReady().then(() => {
    tray = new Tray('img/icons/icon.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Nouvel espace de travail', type: 'normal' },
        { label: 'Fermer tous les logiciels ouverts', type: 'normal' },
        { type: 'separator' },
        
        { label: 'workspace 1', type: 'normal' },
        { label: 'workspace 2', type: 'normal' },
        { label: 'workspace 3', type: 'normal' },
        { label: 'workspace 4', type: 'normal' },
        { label: 'workspace 5', type: 'normal' },

        { type: 'separator' },
        { label: 'Préférences', type: 'normal' },
        { label: 'À propos', type: 'normal' },
        { type: 'separator' },
        { label: 'Quitter', type: 'normal', click() { app.quit() } }

    ])
    tray.setToolTip('Workspace Saver')
    tray.setContextMenu(contextMenu)
})

//app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})