
function logErrorMsg(msg) {
    document.querySelector('.error-msg-container p').innerHTML = msg
    document.querySelector('.error-msg-container').style.bottom = '10px'
    setTimeout(() => {
        document.querySelector('.error-msg-container').style.bottom = '-46px'
    }, 2000)
}

function logSuccessMsg(msg) {
    document.querySelector('.success-msg-container p').innerHTML = msg
    document.querySelector('.success-msg-container').style.bottom = '10px'
    setTimeout(() => {
        document.querySelector('.success-msg-container').style.bottom = '-46px'
    }, 2000)
}