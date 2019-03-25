export const regStart = msg => {
    console.log('Запущена функция regStart()');
    localStorage['steam_username'] = msg.steam_username;
    localStorage['player_id'] = msg.player_id;
    console.log(`Зарегестрирован пользователь: ${localStorage['steam_username']}, id: ${localStorage['player_id']}`)
};

export const deleteUser = () => {
    delete localStorage['steam_username']
};
