// This is the window where user fill the name of his workspace
let workspaceNameBtn = document.querySelector('.workspace-name-btn')
let workspaceNameInput = document.querySelector('.workspace-name-input input')
let workspaceNameContainer = document.querySelector('.workspace-name-input-container')
let workspaceName = document.querySelector('.workspace-name')

workspaceNameBtn.addEventListener('click', setWorkspaceName)
workspaceNameInput.addEventListener('keyup', (event) => { if (event.keyCode === 13) { setWorkspaceName() }})

function setWorkspaceName() {
    let regex = new RegExp(/^ +$/)
    // Save workspace name
    if (workspaceNameInput.value !== '' && !regex.test(workspaceNameInput.value)) {
        sessionStorage.setItem('workspaceName', workspaceNameInput.value)
        workspaceName.innerHTML = sessionStorage.getItem('workspaceName')
        workspaceNameContainer.style.display = 'none'
        initWorkspaceData()
    } else {
        logErrorMsg('Renseigner un nom')
    }
}