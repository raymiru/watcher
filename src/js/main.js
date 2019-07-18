// import {exportNowBetItems} from './elements'
import {nowMatchList, nextMatchList} from "./matchList";
import ip from 'public-ip'
import io from 'socket.io-client'
import {chatMsgArray} from "./chat";

let matchList = {
    now: null,
    next: null
};

let chat = [];

console.log('start')
console.log(chatMsgArray());
const socket = io('https://www.rmbets.site', {
    transports: ['websocket'],
    query: {
        im: 'watcher',
        game: localStorage['game']
    }
});


setTimeout(() => {
    document.location.reload();
}, 3000000)


const auth = () => {

    console.log('Авторизуюсь');
    socket.emit('auth', {
        username: localStorage['username']
    });

};

const exportNowMatchList = () => {
    console.log('Экспортирую список текущих матчей');
    setInterval(() => {
        let currentNowMatchList = nowMatchList();
        if (JSON.stringify(currentNowMatchList) !== JSON.stringify(matchList.now)) {
            matchList.now = currentNowMatchList;
            socket.emit('match_list_now', matchList.now);
            console.log('NOW REPEAT');
        }

    }, 300)
};

const exportNextMatchList = () => {
    console.log('Экспортирую список будущих матчей');
    setInterval(() => {
        let currentNextMatchList = nextMatchList();
        if (JSON.stringify(currentNextMatchList) !== JSON.stringify(matchList.next)) {
            matchList.next = currentNextMatchList;
            socket.emit('match_list_next', matchList.next);
            console.log('NOW REPEAT NEXT');
        }

    }, 1000)
};

const exportChat = () => {

    setInterval(() => {
        let currentChat = chatMsgArray();
        if (JSON.stringify(currentChat) !== JSON.stringify(chat)) {
            chat = currentChat;
            socket.emit('chat', chat);

        }

    }, 1000)
};


socket.on('connect', () => {
    auth();
});

socket.on('auth', data => {
    console.log(data);
    matchList.now = nowMatchList();
    matchList.next = nextMatchList();
    chat = chatMsgArray();
    socket.emit('match_list_next', matchList.next);
    socket.emit('match_list_now', matchList.now);
    socket.emit('chat', chat);

    exportNowMatchList();
    exportNextMatchList();
    exportChat()
});

socket.on('disconnect', () => {
    console.log('disconnect')
});

socket.on('update_watcher', () => {
    window.location.reload()
})
















