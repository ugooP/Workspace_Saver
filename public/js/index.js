let addAppBtn = document.querySelector('.select-app-btn')
let appsContainer = document.querySelector('.app-added-to-workspace')

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

                    addAppToWorkspace(app)
                    break
                }
            }
            if (count === 0) {
                logErrorMsg("Application non trouvée")
            }
        }
    })

function addAppToWorkspace(app) {

    if (isBrowser(input.value.toLowerCase())) {
        
    }
    // If app already added to workspace, don't add it

    // Add new card in apps container
    appsContainer.insertAdjacentHTML('afterbegin', `
        <div class="app-card">
            <p path="${app.path}">${app.name}</p>
            <img src="img/trash.png" alt="Supprimer cette application">
        </div>
    `)

    // Reset input
    input.value = ''
    input.focus()
    ul.style.display = 'none'
}

function isBrowser(app) {
    let browsers = [
        'google chrome', 'firefox', 'firefox developer edition', 'brave browser', 'safari', 'internet explorer'
    ]

    for (let i = 0; i < browsers.length; i++) {
        if (browsers[i] === app) {
            return true
        }
    }
    return false
}
