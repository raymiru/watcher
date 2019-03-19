console.log('Hello world!')


const registerForm = document.querySelector('#register_form');
const STEAM_USERNAME = document.querySelector('#username');
const PERMISSION = document.querySelector('#permission');
const START_BUTTON = document.querySelector('#start');
const WATCHER_BUTTON = document.querySelector('#watcher');
const PLAYER_BUTTON = document.querySelector('#player');
const REG_BUTTON = document.querySelector('#reg');



function testHandler() {
        console.log(msg)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"getText"}, function(response){
            alert(response)
        });
    });
}


function watcherHandler(e) {
    console.log('watcherHandler()')
    e.preventDefault();
    chrome.runtime.sendMessage({
        type: 0,
        steam_username: 'watcher',
        permission: 'watcher'
    });
    START_BUTTON.click();
}

function playerHandler(e) {
    e.preventDefault();
    console.log('playerHandler()');
    chrome.runtime.sendMessage({
        type: 9
    });
    START_BUTTON.click();
}


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
        permission: PERMISSION.value
    });

    console.log(PERMISSION.value)
}



// chrome.runtime.onMessage.addListener(msg => {
//     console.log('LISTENER')
//     if (msg.type === 112) {
//         console.log(112);
//         PLAYER_BUTTON.addEventListener('click', playerHandler);
//     }
// });

registerForm.addEventListener('submit', userHandler);
START_BUTTON.addEventListener('click', startHandler);
WATCHER_BUTTON.addEventListener('click', watcherHandler);
PLAYER_BUTTON.addEventListener('click', testHandler);





