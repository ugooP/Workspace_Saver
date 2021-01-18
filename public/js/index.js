let addAppBtn = document.querySelector('.select-app-btn')
let appsContainer = document.querySelector('.app-added-to-workspace')
let appCardCrossImg = document.querySelector('.app-card .img-container')
let appArrayList = []
let workspaceData

// At startup, workspace is empty, so tell it to the user
isDesktopEmpty()

fetch('/api/appList', { method: 'GET' })
.then((response) => response.json())
.then((data) => {

    // Add selected app to workspace if it's in the app list
    addAppBtn.addEventListener('click', isAppInList)
    input.addEventListener('keyup', (event) => { if (event.keyCode === 13) { isAppInList() }})

    function isAppInList() {
        let count = 0

        for (let i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase() === input.value.toLowerCase()) {
                count++

                let app = {
                    "name": data[i].name,
                    "path": data[i].path
                }

                // Check if the app is already added to the workspace
                if (!isAppAlreadyAddedToWorkspace(app)) {
                    addAppToWorkspace(app)
                    break
                } else {
                    logErrorMsg(`${app.name} est déjà ajouté à l'espace de travail`)
                    break
                }
            }
        }
        if (count === 0) {
            logErrorMsg(`${input.value} n'a pas été trouvé dans la liste`)
        }
    }
})
function isAppAlreadyAddedToWorkspace(app) {
    for (let i = 0; i < appArrayList.length; i++) {
        const appName = appArrayList[i].name;
        if (appName === app.name) {
            return true
        }
    }
    return false
}
function initWorkspaceData() {
    workspaceData = {
        "workspaceName": sessionStorage.getItem('workspaceName'),
        "desktopList": {
            "desktop1": ""
        }
    }
}
function addAppToWorkspace(app) {
    // If it's the first time that user add an app, init the workspaceData variable
    /* if (workspaceData === undefined) {
        initWorkspaceData()
    } */
    // Check if the added app is a browser
    let browserRegExp = new RegExp('(google chrome|firefox|firefox developer edition|brave browser|safari|internet explorer)$')
    if (browserRegExp.test(app.name.toLowerCase())) {
        // Make a new array in the appList with all tabs for this browser
        let newApp = {
            "name": app.name,
            "path": app.path,
            "tabs": []
        }
        appArrayList.push(newApp)

        // Add new browser card in apps container
        appsContainer.insertAdjacentHTML('beforeend', `
            <div class="app-card browser-app-card">
                <div class="app-card-title">
                    <p path="${app.path}">${app.name}</p>
                    <div class="img-container" onclick="removeApp('${app.name}')">
                        <img src="./img/cross.png" alt="Supprimer ${app.name}">
                    </div>
                </div>
                <div class="browser-app-tab-container" onclick="createTabsWindow('${app.name}')">
                    <p class="browser-app-tab-name">Gérer les onglets...</p>
                </div>
            </div>
        `)
    } else {
        // Add new card in apps container
        appsContainer.insertAdjacentHTML('beforeend', `
            <div class="app-card">
                <p path="${app.path}">${app.name}</p>
                <div class="img-container" onclick="removeApp('${app.name}')">
                    <img src="./img/cross.png" alt="Supprimer ${app.name}">
                </div>
            </div>
        `)
        appArrayList.push(app)
    }

    // Delete the empty message if it's the first app added
    isDesktopEmpty()

    // Reset input
    input.value = ''
    input.focus()
    ul.style.maxHeight = '0'
}
function removeApp(appName) {
    let appCards = document.querySelectorAll('.app-card')

    for (let i = 0; i < appArrayList.length; i++) {
        const app = appArrayList[i];
        if (app.name === appName) {
            //Remove app from the array list
            appArrayList.splice(i, 1)
            
            //Remove app from the app container
            appsContainer.removeChild(appCards[i])
            break
        }
    }
    isDesktopEmpty()
}
function isDesktopEmpty() {
    if (appArrayList.length === 0) {
        // If there is no app added to the workspace, say it to the user
        appsContainer.style.justifyContent = 'center'

        appsContainer.insertAdjacentHTML('afterbegin', `
            <div class="empty-desktop-msg-container">
                <p>Ce bureau est vide...</p>
                <p>Commence par <span onclick="document.querySelector('.search-input').click(); document.querySelector('.search-input').focus()">Ajouter une application</span></p>
            </div>
        `)
    } else {
        try {
            // If the added app is the first of the desktop, remove the message
            appsContainer.removeChild(document.querySelector('.empty-desktop-msg-container'))
            appsContainer.style.justifyContent = 'space-between'
        } catch (TypeError) {}
    }
}
function saveNewWorkspace() {
    workspaceData.desktopList.desktop1 = appArrayList
    
    // If workspace is empty, don't save it
    if (workspaceData.desktopList.desktop1.length === 0) {
        logErrorMsg('Cet espace de travail est vide')
    } else {
        createJSONfile(workspaceData)
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
    console.log('workspace created');
}