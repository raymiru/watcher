export const loginStart = () => {
    console.log('Запущена функция loginStart()');
    chrome.runtime.sendMessage({
        type: "to_background_login",
        steam_username: localStorage['steam_username'],
        player_id: localStorage['player_id'],
        permission: 'player',
        bank: document.querySelector('body > div.layout > div.layout__header > header >' +
            ' div.header__outer > div > div.header__body > div.header__userbar > div > div > ' +
            'div.userbar-user__bars > div > div.action-bars__user-info > div > div.user-info__current-user > div > ' +
            'a.current-user__rating.current-user__rating_mobile > span').innerText
    })
};
