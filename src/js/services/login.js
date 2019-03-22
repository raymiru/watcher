export const loginStart = () => {
    console.log('Запущена функция loginStart()');
    chrome.runtime.sendMessage({
        type: "to_background_login",
        steam_username: localStorage['steam_username'],
        permission: 'player'
    })
};
