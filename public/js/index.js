let addAppBtn = document.querySelector('.select-app-btn')
let appsContainer = document.querySelector('.app-added-to-workspace')

addAppBtn.addEventListener('click', () => {

    console.log(isBrowserApp(input.value.toLowerCase()))

    let app = {
        "name": input.value,
        "path": getAppPath(input.value)
    }
    // If app already added to workspace, don't add it

    appsContainer.insertAdjacentHTML('afterbegin', `
        <div class="app-card">
            <p path="${app.path}">${app.name}</p>
            <img src="img/trash.png" alt="Supprimer cette application">
        </div>
    `)
})

function getAppPath(appName) {
    let listLi = document.querySelectorAll('.app-list li')

    for (let i = 0; i < listLi.length; i++) {
        const li = listLi[i];
        if (li.innerHTML.toLowerCase() === appName.toLowerCase()) {
            return li.getAttribute('path')
        }
    }
}

function isBrowserApp(app) {
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
