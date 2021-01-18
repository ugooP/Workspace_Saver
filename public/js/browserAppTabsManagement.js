let tabManagementWindowContainer = document.querySelector('.tab-management-window-container')

function createTabsWindow(appName) {
    tabManagementWindowContainer.insertAdjacentHTML('afterbegin' , `
        <div class="browser-app-tab-management-window">
            <div class="tab-input-container">
            </div>
            <div class="save-tab-btn">
                <button class="button-default-style" onclick="saveURLs('${appName}')">Enregistrer</button>
            </div>
        </div>
    `)
    // Get the index of the app with the appArrayList
    let tabInputContainer = document.querySelector('.tab-input-container')

    for (let i = 0; i < appArrayList.length; i++) {
        const app = appArrayList[i];
        if (app.name === appName && app.tabs.length !== 0) {
            for (let j = 0; j < app.tabs.length; j++) {
                const url = app.tabs[j].url;
                tabInputContainer.insertAdjacentHTML('beforeend', `
                    <input type="text" placeholder="https://www.google.com/" value="${url}">
                `)
            }
            // Reset the "tabs" array of this app
            app.tabs = []
        }
    }
    createNewTabInput()
}

function createNewTabInput() {
    let tabInputContainer = document.querySelector('.tab-input-container')

    tabInputContainer.insertAdjacentHTML('beforeend', `
        <input type="text" placeholder="https://www.google.com/">
    `)
    
    let tabInputs = document.querySelectorAll('.tab-input-container input')

    tabInputs[tabInputs.length - 1].addEventListener('input', () => {
        let invalidURLmsg = document.querySelector('.invalidURLmsg')
        let urlRegExp = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')

        if (urlRegExp.test(tabInputs[tabInputs.length - 1].value) && tabInputs[tabInputs.length] === undefined) {
            // Reset the style of the input
            tabInputs[tabInputs.length - 1].style.border = '1px solid #1E2024' 
            tabInputs[tabInputs.length - 1].style.boxShadow = 'none'
    
            if (invalidURLmsg) {
                tabInputContainer.removeChild(invalidURLmsg)
            }

            // Don't create a new input if one is still empty 
            let emptyInputCounter = 0
            for (let i = 0; i < tabInputs.length; i++) {
                if (tabInputs[i].value === '') { emptyInputCounter++ }
            }
            if (emptyInputCounter === 0) { createNewTabInput() }
        }
        else {
            tabInputs[tabInputs.length - 1].style.border = '1px solid red' 
            tabInputs[tabInputs.length - 1].style.boxShadow = '0 0 11px 0px #ff0000a6'

            // Don't display the invalid URL msg more than one time
            if (invalidURLmsg === null) {
                tabInputs[tabInputs.length - 1].insertAdjacentHTML('afterend', `<p class="invalidURLmsg" style="color: #ff4242; font-size: 12px; margin-top: -7px">URL invalide</p>`)
            }
        }
    })
}

function saveURLs(appName) {
    // Save the links of the tabs and close the window
    let browserTabsWindow = document.querySelector('.browser-app-tab-management-window')
    let tabInputContainer = document.querySelector('.tab-input-container')
    let tabInputs = document.querySelectorAll('.tab-input-container input')

    for (let i = 0; i < tabInputs.length; i++) {
        const input = tabInputs[i]
        const url = input.value
        const regexp = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/

        if (url !== '') {
            const tab = {
                "website": url.match(regexp)[1],
                "url": url
            }
            // Add tab to the specific app
            for (let j = 0; j < appArrayList.length; j++) {
                if (appArrayList[j].name === appName) {
                    appArrayList[j].tabs.push(tab)
                    break
                }
            }
        }
        tabInputContainer.removeChild(input)
    }
    tabManagementWindowContainer.removeChild(browserTabsWindow)

    // Update the card of the app with tabs content
    let appCards = document.querySelectorAll('.app-card')
    // Get the app by his index in appArrayList
    for (let i = 0; i < appArrayList.length; i++) {
        const app = appArrayList[i];
        if (app.name === appName) {
            appCards[i].querySelector('.browser-app-tab-name').innerHTML = displayTabsName(app.tabs)
        }
    }
}
function displayTabsName(tabArray) {
    if (tabArray.length !== 0) {
        // From all tabs, export a string with all names of the websites in succession
        let websites = []
        for (let i = 0; i < tabArray.length; i++) {
            const tabName = tabArray[i].website;
            websites.push(tabName)
        }    
        
        let outputTxt = ''
        for (let j = 0; j < websites.length; j++) {
            outputTxt += `${websites[j]} • `
        }
        return outputTxt
    } else {
        return 'Gérer les onglets...'
    }
}