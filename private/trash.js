const fs = require('fs')

let workspaceList = []
let readdir = fs.readdirSync('save')

for (let i = 0; i < readdir.length; i++) {
    const file = readdir[i];
    if (/\.json/.test(file)) {
        // Push the data of the workspace in the 'workspaceList array'
        let readFile = fs.readFileSync(`./save/${file}`)
        let workspaceData = JSON.parse(readFile)
        workspaceList.push(workspaceData)
    }
}