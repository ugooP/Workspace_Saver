const fs = require('fs')

function getAllWorkspaceNames() {
    // Get all workspaces's names in the "workspaceNames" array
    let workspaceNames = []
    let files = fs.readdirSync('save')
    for (let i = 0; i < files.length; i++) {
        if (files[i] !== '.DS_Store') {
            let data = fs.readFileSync(`save/${files[i]}`)
            let workspaceData = JSON.parse(data)
            workspaceNames.push(workspaceData.workspaceName)
        }
    }
    
    // Create an object for each workspace
    let workspaceObjects = []
    for (let j = 0; j < workspaceNames.length; j++) {
        const name = workspaceNames[j];
        const obj = { label: name, type: 'normal' }
        workspaceObjects.push(obj);
    }

    return workspaceObjects
}
console.log(getAllWorkspaceNames())
