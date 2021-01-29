module.exports = {
    startServer: startServer()
}

function startServer() {
    const exec = require('child_process').exec
    const fs = require('fs')

    // Server initiation
    const express = require('express')
    const app = express()
    app.listen(3000)

    app.use(express.static('public'))
    app.use(express.json())

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
        // Sort the list in alphabetical order
        bigAppList.sort((a, b) => (a.name > b.name) ? 1 : -1)
        res.send(JSON.stringify(bigAppList))
    })

    /* app.post('/api/appList', (req, res) => {
        open(`/${req.body}`)
    }) */

    app.post('/api/tray', (req, res) => { 
        // Update the tray menu
        console.log('in');
    })

    app.post('/api/save', (req, res) => {
        // Create a new JSON file with all the data of the workspace in question
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
        })
    })
}