function saveNewWorkspace() {
    // Add all apps from appArrayList to the desktop array
    workspaceData.desktopList.push(appArrayList)
    
    // If workspace is empty, don't save it
    if (appArrayList.length === 0) {
        logErrorMsg('Cet espace de travail est vide')
    } else {
        createJSONfile(workspaceData)
        // Refresh the tray menu
        //fetch('/api/tray', { method: 'POST' })
    }
}

async function createJSONfile(fileContent) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fileContent)
    }
    await fetch('/api/save', options)
        .then((res) => res.text())
        .then((data) => {
            // When the JSON is created, display the success saved window
            let workspaceIndex = data
            displaySavedWorkspaceMsg(workspaceData.workspaceName, workspaceIndex)    
    })
}
