console.log('Я popup.js файл');
const buttons = {
    watcher: document.querySelector('#watcher'),
    steam_username: document.querySelector('#username'),
    player: document.querySelector('#player'),
    delete_player: document.querySelector('#delete_player')
};

buttons.delete_player.setAttribute('disabled', true);

const regCheck = () => {
  if (localStorage['steam_username'] !== undefined) {
      document.querySelector('#app').setAttribute('style', 'background-color: green')
      buttons.player.innerText = localStorage['steam_username'];
      buttons.delete_player.removeAttribute('disabled')
      console.log('Готов запускать плеера')
  }
};

regCheck();

const sendMsg = msg => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, msg)
        }
    );
};

const regForm = document.querySelector('#reg_form');

const watcherHandler = e => {
    e.preventDefault();
    console.log('Нажата кнопка Watcher');
    sendMsg({
        type: 'registration',
        steam_username: 'watcher',
        permission: 'watcher'
    })
    localStorage['steam_username'] = 'watcher'
};

const regHandler = e => {
    e.preventDefault();
    console.log('Нажата кнопка Reg');
    sendMsg({
        type: 'registration',
        steam_username: buttons.steam_username.value,
        permission: 'player'
    });
    localStorage['steam_username'] = buttons.steam_username.value
};

const playerHandler = e => {
    e.preventDefault();
    if (localStorage['steam_username'] !== undefined) {
        console.log('OK')
        sendMsg({
            type: 'permission',
            permission: 'player'
        })
    } else {
        alert('Player not registered')
    }
};

const deleteLSHandler = () => {
  delete localStorage['steam_username'];
  sendMsg({
      type: 'delete_user'
  })
};


buttons.watcher.addEventListener('click', watcherHandler);
regForm.addEventListener('submit', regHandler);
buttons.delete_player.addEventListener('click', deleteLSHandler);
buttons.player.addEventListener('click', playerHandler);
