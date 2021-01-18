function openApp() {
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
}