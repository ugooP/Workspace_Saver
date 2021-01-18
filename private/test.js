const fs = require('fs')
let indexArray = []
let workspaceIndex
        
fs.readdir('save', (err, files) => {
    // Find the index of all workspaces and add 1 to the highest index
    console.log(files);
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
})
