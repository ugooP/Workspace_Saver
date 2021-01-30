let savedWorkspaceMsgContainer = document.querySelector('.saved-workspace-msg-container')
let savedWorkspaceMsg = document.querySelector('.saved-workspace-msg span')

function displaySavedWorkspaceMsg(workspaceName, workspaceIndex) {
    savedWorkspaceMsgContainer.style.display = 'flex'
    savedWorkspaceMsg.innerHTML = `"${workspaceName}"`
    savedWorkspaceMsgContainer.insertAdjacentHTML('beforeend', `
        <button class="button-default-style run-workspace-btn" onclick="openWorkspace(${workspaceIndex})">Lancer cet espace de travail</button>
    `)
}