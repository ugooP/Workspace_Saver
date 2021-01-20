let savedWorkspaceMsgContainer = document.querySelector('.saved-workspace-msg-container')
let savedWorkspaceMsg = document.querySelector('.saved-workspace-msg span')

function displaySavedWorkspaceMsg(workspaceName) {
    savedWorkspaceMsgContainer.style.display = 'flex'
    savedWorkspaceMsg.innerHTML = `"${workspaceName}"`
}