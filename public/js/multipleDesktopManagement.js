// Gestion of multiple desktops (not implemented in the app)
let desktopList = document.querySelector('.desktop-list')
let desktopNumber = document.querySelector('.desktop-number')

function createNewDesktop(position) {
    let allDesktop = document.querySelectorAll('.desktop')

    // Remove "active-desktop" class from the last desktop
    for (let i = 0; i < allDesktop.length; i++) {
        if (allDesktop[i].classList.contains('active-desktop')) {
            allDesktop[i].classList.remove('active-desktop')
        }
    }

    // Create the new Desktop
    desktopList.insertAdjacentHTML(position, `
        <div class="desktop active-desktop" onclick="selectDesktop(${getTotNbOfDesktop()})">
            <p>Bureau ${getTotNbOfDesktop()}</p>
        </div>
    `)

    // Update the "desktop-number-container"
    desktopNumber.innerHTML = `Bureau ${getTotNbOfDesktop() - 1}`

}

function getTotNbOfDesktop() {
    let allDesktop = document.querySelectorAll('.desktop')
    let totNbOfDesktop = 1

    for (let i = 0; i < allDesktop.length; i++) {
        totNbOfDesktop++
    }
    return totNbOfDesktop
}

function selectDesktop(desktopNb) {
    let allDesktop = document.querySelectorAll('.desktop')

    // Remove "active-desktop" class from the last desktop
    for (let i = 0; i < allDesktop.length; i++) {
        if (allDesktop[i].classList.contains('active-desktop')) {
            allDesktop[i].classList.remove('active-desktop')
        }
    }

    allDesktop[desktopNb - 1].classList.add('active-desktop')
    desktopNumber.innerHTML = `Bureau ${desktopNb}`

    displayDesktopInfos(desktopNb)
}

function displayDesktopInfos(desktopNb) {
    
}
