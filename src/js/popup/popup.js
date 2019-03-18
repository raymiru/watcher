console.log('Я popup.js файл');
const buttons = {
    watcher: document.querySelector('#watcher')
};

function testHandler() {
    console.log('Нажата кнопка Watcher');
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'permission',
                permission: 'watcher'
            })
        }
    );
}


buttons.watcher.addEventListener('click', testHandler);
