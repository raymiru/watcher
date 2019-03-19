export const regStart = msg => {
    console.log('Запущена функция regStart()');
    localStorage['steam_username'] = msg.steam_username;
    console.log(`Зарегестрирован пользователь: ${localStorage['steam_username']}`)
};

export const deleteUser = () => {
    delete localStorage['steam_username']
};
