export const loginStart = socket => {
    console.log('Запущена функция loginStart()');
    socket.emit('register', {
        steam_username: localStorage['steam_username'],
        permission: 'player'
    });
};
