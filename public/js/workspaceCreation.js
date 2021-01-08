let desktopList = document.querySelector('.desktop-list')

function createNewDesktop(side) {
    let position
    side === 'left' ? position = 'afterbegin' : position = 'beforeend'
    
    desktopList.insertAdjacentHTML(position, `
        <div class="desktop">
            <p>Bureau ${getTotNbOfDesktop()}</p>
        </div>
    `)
}

function getTotNbOfDesktop() {
    let allDesktop = document.querySelectorAll('.desktop')
    let totNbOfDesktop = 1

    for (let i = 0; i < allDesktop.length; i++) {
        totNbOfDesktop++
    }
    return totNbOfDesktop
}