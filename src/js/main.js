import io from 'socket.io-client'
import {watcherStart} from './services/watcher'
import {deleteUser, regStart} from "./services/registration";
import {playerStart} from "./services/player";

const socket = io.connect('http://35.246.13.97/');

const permissionListener = () => {

    chrome.runtime.onMessage.addListener(msg => {
        console.log(msg)
        if (msg.type === 'permission') {
            if (msg.permission === 'watcher') {
                watcherStart(socket);
            } else if (msg.permission === 'player') {
                playerStart(socket);
            }
        } else if (msg.type === 'registration') {
            console.log('Регистрация');
            regStart(socket, msg);
        } else if (msg.type === 'delete_user') {
            console.log(`${localStorage['steam_username']} удален`)
            deleteUser();
        }
    });

};

const regCheck = () => {
    console.log(`Пользователь: ${localStorage['steam_username']} `)
    if (localStorage['steam_username'] !== undefined) {
        playerStart(socket);
    }
};

regCheck();
permissionListener();
