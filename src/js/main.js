import io from 'socket.io-client'
import {watcherStart} from './services/watcher'

const socket = io.connect('http://localhost:4000');

const permissionListener = () => {
    chrome.runtime.onMessage.addListener(msg => {
        if (msg.type === 'permission') {
            if (msg.permission === 'watcher') {
                console.log('Нажата кнопка Watcher');
                watcherStart(socket);
            } else if (msg.permission === 'player') {
                console.log('Нажата кнопка player')
                playerStart();
            }
        }
    });
};


permissionListener();
