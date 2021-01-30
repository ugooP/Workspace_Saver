const fs = require('fs')

module.exports = (index) => { openWorkspace(index) }

function openWorkspace(index) {
    console.log(`\nLancement du workspace ${index}`);

    // Get the workspace's data from his JSON file
    let readFile = fs.readFileSync(`./save/workspace${index}.json`)
    let data = JSON.parse(readFile)

    // Browse all desktops
    for (let i = 0; i < data.desktopList.length; i++) {
        const desktop = data.desktopList[i];
        // Browse all apps of the selected desktop
        for (let j = 0; j < desktop.length; j++) {
            const app = desktop[j];
            console.log(app.name);
        }
    }
}
