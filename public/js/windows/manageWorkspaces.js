
// A window where all saved workspaces are displayed and where user can delete or modify any of these workspaces
// This window only works in a browser (not in Electron)

let manageWorkspacesContainer = document.querySelector('.manage-workspaces-container')
let emptyMsg = document.querySelector('.manage-workspaces-container .empty-msg')

// Get all workspaces data
fetch('/api/workspaces', { method: 'GET' })
.then((response) => response.json())
.then((data) => {
    let workspaceList = data
    
    if (workspaceList.length > 0) {
        for (let i = 0; i < workspaceList.length; i++) {
            const workspace = workspaceList[i];
            setTimeout(() => {
                manageWorkspacesContainer.insertAdjacentHTML('beforeend', `
                    <div class="workspace-card">
                        <div class="left-part">
                            <img src="../img/right-arrow.png" class="right-arrow">
                            <p>${workspace.workspaceName}</p>
                        </div>
                        <div class="right-part">
                            <img src="../img/pencil.png" class="modify-pencil">
                            <img src="../img/trash.png" class="trash">
                        </div>
                    </div>
                `)
            }, i*100)
        }
    } else {
        // Display empty message
        manageWorkspacesContainer.style.justifyContent = 'center'
        emptyMsg.style.display = 'block'
    }
})