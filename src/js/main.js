import {watcherStart} from './services/watcher'
import {deleteUser, regStart} from "./services/registration";
import {playerStart} from "./services/player";



const permissionListener = () => {

    chrome.runtime.onMessage.addListener(msg => {
        console.log(msg)
        if (msg.type === 'permission') {
            if (msg.permission === 'watcher') {
                watcherStart();
            } else if (msg.permission === 'player') {
                playerStart();
            }
        } else if (msg.type === 'registration') {
            console.log('Регистрация');
            regStart(msg);
        } else if (msg.type === 'delete_user') {
            console.log(`${localStorage['steam_username']} удален`);
            deleteUser();
        }
    });

};

const regCheck = () => {
    console.log(`Пользователь: ${localStorage['steam_username']} `);
    if (localStorage['steam_username'] !== undefined) {
        playerStart();
    }
};

regCheck();
permissionListener();
