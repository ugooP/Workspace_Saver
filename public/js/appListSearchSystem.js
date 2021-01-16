let input = document.querySelector('.search-input')
let ul = document.querySelector('.app-list')
let addBtn = document.querySelector('.select-app-btn')
let mouseStatus, appArray

fetch('/api/appList', { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
        appArray = data

        // Display all programs
        for (let i = 0; i < data.length; i++) {
            const app = data[i].name;
            ul.insertAdjacentHTML('beforeend', `
                <li onclick="fillInput('${app}')" path="${data[i].path}">${app}</li>
            `)
        }
    })

function fillInput(app) {
    input.value = app
    ul.style.display = 'none'
    input.focus()
}

function setMouseStatus(status) {
    // If the mouse is over the ".app-list" element, set mouseStatus to true and vice versa
    mouseStatus = status
}

// Search system
input.addEventListener('input', () => {
    let listLi = document.querySelectorAll('.app-list li')
    let userInput = input.value
    
    for (let i = 0; i < appArray.length; i++) {
        let app = appArray[i];
        if (app.name.toLowerCase().substring(0, userInput.length) === userInput.toLowerCase()) {
            listLi[i].style.display = ''
        } else {
            listLi[i].style.display = 'none'
        }
    }
})

// On focus, show the list of applications
input.addEventListener('click', () => {
    ul.style.height = '303px'
})
// On blur, hide the list of applications
input.addEventListener('blur', () => {
    if (!mouseStatus) {
        ul.style.height = '0'
    }
})