let addAppBtn = document.querySelector('.select-app-btn')
let appsContainer = document.querySelector('.app-added-to-workspace')
let appArrayList = []
let workspaceData

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
            logErrorMsg(`${input.value} n'a pas été trouvé`)
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

function addAppToWorkspace(app) {

    // If it's the first time that user add an app, init the workspaceData variable
    if (workspaceData === undefined) {
        initWorkspaceData()
    }

    // Check if the added app is a browser
    let browserRegExp = new RegExp('(google chrome|firefox|firefox developer edition|brave browser|safari|internet explorer)$')
    if (browserRegExp.test(app.name.toLowerCase())) {
        logSuccessMsg('ça c un browser')
    }
    // Add new card in apps container
    appsContainer.insertAdjacentHTML('afterbegin', `
        <div class="app-card">
            <p path="${app.path}">${app.name}</p>
            <img src="img/trash.png" alt="Supprimer cette application">
        </div>
    `)

    appArrayList.push(app)

    // Reset input
    input.value = ''
    input.focus()
    ul.style.display = 'none'
}

function initWorkspaceData() {
    workspaceData = {
        "workspaceName": sessionStorage.getItem('workspaceName'),
        "desktopList": {
            "desktop1": []
        }
    }
}
