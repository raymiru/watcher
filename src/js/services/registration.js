export const regStart = msg => {
    console.log('Запущена функция regStart()');
    localStorage['steam_username'] = msg.steam_username;
    localStorage['player_id'] = msg.player_id;
    localStorage['currency'] = msg.currency;
    console.log(`Зарегестрирован пользователь: ${localStorage['steam_username']}, id: ${localStorage['player_id']}`)
};

export const deleteUser = () => {
    delete localStorage['steam_username']
};
