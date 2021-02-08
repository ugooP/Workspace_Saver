// This is the successfully saved workspace window
let savedWorkspaceMsgContainer = document.querySelector('.saved-workspace-msg-container')
let savedWorkspaceMsg = document.querySelector('.saved-workspace-msg span')

function displaySavedWorkspaceMsg(workspaceName, workspaceIndex) {
    savedWorkspaceMsgContainer.style.display = 'flex'
    savedWorkspaceMsg.innerHTML = `"${workspaceName}"`
    savedWorkspaceMsgContainer.insertAdjacentHTML('beforeend', `
        <button class="button-default-style run-workspace-btn" onclick="openWorkspaceFromBrowser(${workspaceIndex})">Lancer l'espace de travail</button>
    `)
}

function openWorkspaceFromBrowser(index) {
    // Open a workspace just after create it, from the success saved window
    fetch('/api/openWorkspace', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: index
    })
}