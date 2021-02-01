const fs = require('fs')
const open = require('open')
const childProcess = require('child_process')
const { log } = require('console')

module.exports = (index) => { openWorkspace(index) }

async function openWorkspace(index) {
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

            // Check if the app is a browser
            if (app.tabs && app.tabs.length > 0) {
                // If the app is a browser, open all tabs
                for (let k = 0; k < app.tabs.length; k++) {
                    const url = app.tabs[k].url
                    await open(url, { app: `/${app.path}` })
                }
            } else {
                await open(`/${app.path}`)
            }
        }
    }
    console.log('Done');
}
