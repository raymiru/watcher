import io from 'socket.io-client'
import {host} from './config'

let socket;

if (localStorage['dev'] === "1") {
    socket = io.connect(host.dev);
} else {
    socket = io.connect(host.prod);
}



const socketListener = () => {
    socket.on('bet_msg_to_player', msg => {
        console.log('Отправляю сообщение игроку');
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'to_player',
                    team_winner: msg.team_winner,
                    bet_val: msg.bet_val
                })
            }
        );
    })
    socket.on('url_handler', msg => {
        console.log('Меняю URL');
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'url_handler',
                    match_url: msg.match_url
                })
            }
        );
    })
};

const contentScriptListener = () => {
    chrome.runtime.onMessage.addListener(msg => {
        console.log(`to_background_login: ${msg}`)
        if (msg.type === 'to_background_login') {
            console.log('Понял, принял');
            socket.emit('login', {
                    steam_username: localStorage['steam_username'],
                    permission: 'player'
            });
        }
        if (msg.type === 'to_background_static') {
            console.log('to_background_static')
            socket.emit('bet_msg_from_watcher', {
                match_url: msg.match_url,
                team_1_name: msg.team_1_name,
                team_2_name: msg.team_2_name,
                team_1_img: msg.team_1_img,
                team_2_img: msg.team_2_img,
                bo: msg.buttons,
                team_1_odds: msg.team_1_odds,
                team_2_odds: msg.team_2_odds,
            })
        }
        if (msg.type === 'to_background_dynamic') {
            socket.emit('bet_msg_from_watcher', {
                max_bet: msg.max_bet,
                team_1_odds: msg.team_1_odds,
                team_2_odds: msg.team_2_odds,
            });
        }
    })
};




contentScriptListener();
socketListener();

