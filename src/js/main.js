import {exportNowBetItems, changeDetector} from './elements'
import io from 'socket.io-client'


const socket = io(localStorage['host'], {
    transports: ['websocket']
});

const auth = () => {
    socket.emit('auth', {
        username: 'watcher'
    })
};

let timerId = null;

const exportBetItems = () => {
    let nowBetItems = exportNowBetItems();
    socket.emit('match', nowBetItems);
    timerId = setInterval(() => {
        console.log(nowBetItems.length)
        if (changeDetector(nowBetItems.length)) {
            clearInterval(timerId);
            socket.emit('info', 'change');
            exportBetItems();

            // document.location.reload();
        }
    }, 500);
};

socket.on('connect', () => {
    auth();
    exportBetItems();
});

socket.on('auth', data => {
    console.log(data)
});

socket.on('disconnect', () => {
    console.log('disconnect')
});
















