console.log('Hello world!')


const registerForm = document.querySelector('#register_form');
const STEAM_USERNAME = document.querySelector('#username');
const USER_ID = document.querySelector('#user_id');
const PERMISSION = document.querySelector('#permission');
const START_BUTTON = document.querySelector('#start');

function startHandler(e) {
    e.preventDefault();
    chrome.runtime.sendMessage({
        type: 1,
    });
}

function userHandler(e) {
    e.preventDefault();
    console.log(STEAM_USERNAME)
    chrome.runtime.sendMessage({
        type: 0,
        steam_username: STEAM_USERNAME.value,
        user_id: USER_ID.value,
        permission: PERMISSION.value
    });

    console.log(PERMISSION.value)
}

registerForm.addEventListener('submit', userHandler);
START_BUTTON.addEventListener('click', startHandler);






