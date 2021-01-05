let input = document.querySelector('input')
let ul = document.querySelector('ul')
let btn = document.querySelector('button')
let appList

fetch('/api/appList', { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
        appList = data

        // Display all programs
        for (let i = 0; i < data.length; i++) {
            const app = data[i].name;
            ul.insertAdjacentHTML('beforeend', `
                <li onclick="fillInput('${app}')">${app}</li>
            `)
        }
    })

// Search system
input.addEventListener('input', () => {
    let listLi = document.querySelectorAll('li')
    userInput = input.value
    
    for (let i = 0; i < appList.length; i++) {
        const app = appList[i];
        if (app.name.toLowerCase().substring(0, userInput.length) === userInput.toLowerCase()) {
            listLi[i].style.display = ''
        } else {
            listLi[i].style.display = 'none'
        }
    }
})
// On focus, show the list of applications
input.addEventListener('focus', () => {
    ul.style.display = 'flex'
})
// On blur, hide the list of applications
input.addEventListener('blur', () => {
    ul.style.display = 'none'
})

// Run the selected app
btn.addEventListener('click', () => {
    let path
    // Get the path of the selected prorgam
    for (let i = 0; i < appList.length; i++) {
        if (input.value.toLowerCase() === appList[i].name.toLowerCase()) {
            path = appList[i].path;
            break
        }
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: path
    }
    fetch('/api/appList', options)
})
    
function fillInput(app) {
    input.value = app
}