module.exports = {
    startServer: startServer()
}

function startServer() {
    const exec = require('child_process').exec
    const open = require('open')
    const fs = require('fs')

    // Server initiation
    const express = require('express')
    const app = express()
    app.listen(3000)

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
        // Sort the list in alphabetical order
        bigAppList.sort((a, b) => (a.name > b.name) ? 1 : -1)
        res.send(JSON.stringify(bigAppList))
    })

    app.post('/api/appList', (req, res) => {
        open(`/${req.body}`)
    })

    /* app.get('/api/workspace', (req, res) => {
        let file = fs.readFileSync('./save/patternWorkspace.json')
        res.send(JSON.parse(file))
    }) */
}


