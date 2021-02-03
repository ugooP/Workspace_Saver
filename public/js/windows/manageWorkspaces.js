let manageWorkspacesContainer = document.querySelector('.manage-workspaces-container')

// Get all workspaces data
fetch('/api/workspaces', { method: 'GET' })
.then((response) => response.json())
.then((data) => {
    let workspaceList = data
    
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
        }, 500)
    }
})

