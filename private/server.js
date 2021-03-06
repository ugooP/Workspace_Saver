module.exports = {
    start: startServer()
}

function startServer() {
    const exec = require('child_process').exec
    const fs = require('fs')
    const openWorkspace = require('./openWorkspace')

    // Server initiation
    const express = require('express')
    const app = express()
    app.listen(3000)
    app.use(express.static('public'))
    app.use(express.json())
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

    // Send to client side the list of all apps
    app.get('/api/appList', (req, res) => {
        // Sort the list in alphabetical order
        bigAppList.sort((a, b) => (a.name > b.name) ? 1 : -1)
        res.send(JSON.stringify(bigAppList))
    })

    // Create a JSON file with all the data of the workspace in question
    app.post('/api/save', (req, res) => {
        let indexArray = []
        let workspaceIndex
        
        fs.readdir('save', (err, files) => {
            // Find the index of all workspaces and add 1 to the highest index
            for (let i = 0; i < files.length; i++) {
                if (files[i] !== '.DS_Store') {
                    let match = files[i].match(/[0-9]+/)
                    if (match !== null) {
                        indexArray.push(match[0])
                    }
                }
            }
            //Create the new JSON file with an unique workspace index
            if (indexArray.length !== 0) {
                workspaceIndex = Math.max(...indexArray) + 1
            } else {
                workspaceIndex = 0
            }
            fs.writeFileSync(`save/workspace${workspaceIndex}.json` , JSON.stringify(req.body))

            res.send(workspaceIndex.toString())
        })
    })

    // Open a workspace
    app.post('/api/openWorkspace', (req, res) => {
        openWorkspace(req.body)
    })

    // Retrun the list of all workspaces
    app.get('/api/workspaces', (req, res) => {
        let workspaceList = []
        let readdir = fs.readdirSync('save')
        
        for (let i = 0; i < readdir.length; i++) {
            const file = readdir[i];
            if (/\.json/.test(file)) {
                // Push the data of the workspace in the 'workspaceList' array
                let readFile = fs.readFileSync(`save/${file}`)
                let workspaceData = JSON.parse(readFile)
                workspaceList.push(workspaceData)
            }
        }
        // Return the 'workspaceList' array
        res.send(workspaceList)
    })
}