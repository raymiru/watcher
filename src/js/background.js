import io from 'socket.io-client'
import {setHost} from './config'

let socket = io(setHost(), {
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity
});

socket.on('error', () => {
    console.log('error')
    socket.open();
})

const socketListener = () => {
    socket.on('disconnect', msg => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'reload',
                })
            }
        );
    })

    socket.on('bet_msg_to_player', msg => {
        console.log('Отправляю сообщение игроку');
        console.log(msg)
        try {
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: 'to_player',
                        team_winner: msg.team_winner,
                        bet_val: msg.bet_val,
                        delay: msg.delay
                    })
                }
            );
        } catch (e) {
            console.log(e)
        }
    });

    socket.on('msg_to_player', msg => {
        console.log('НАЖАТИЕ НА КНОПКУ ПОБЕДИТЕЛЯ')
        try {
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: 'to_watcher',
                        team_winner: msg.team_winner,
                    })
                }
            );
        } catch (e) {
            console.log(e)
            console.log('ОШИБКА')
        }
    });


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

    socket.on('go_back', msg => {
        console.log('Меняю URL');
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'go_back',
                })
            }
        );
    })
};

const contentScriptListener = () => {
    chrome.runtime.onMessage.addListener(msg => {
        console.log(`to_background_login: ${msg}`)
        if (msg.type === 'to_background_login') {
            console.log(msg)
            socket.emit('login', {
                steam_username: msg.steam_username,
                player_id: msg.player_id,
                currency: msg.currency,
                permission: msg.permission,
            });
            socket.emit('player_info_update', {
                steam_username: msg.steam_username,
                player_id: msg.player_id,
                permission: msg.permission,
                currency: msg.currency,
                bank: msg.bank,
                team_1_bet: msg.team_1_bet,
                team_2_bet: msg.team_2_bet
            })
        }

        if (msg.type === 'to_background_update_info') {
            console.log('update info');
            socket.emit('player_info_update', {
                steam_username: msg.steam_username,
                bank: msg.bank,
                permission: msg.permission,
                team_1_bet: msg.team_1_bet
            })
        }

        if (msg.type === 'to_background_static') {
            console.log('to_background_static')
            socket.emit('bet_msg_from_watcher', {
                player_id: msg.player_id,
                match_url: msg.match_url,
                team_1_name: msg.team_1_name,
                team_2_name: msg.team_2_name,
                team_1_img: msg.team_1_img,
                team_2_img: msg.team_2_img,
                team_1_odds: msg.team_1_odds,
                team_2_odds: msg.team_2_odds,
            })
        }
        if (msg.type === 'to_background_dynamic') {
            socket.emit('bet_msg_from_watcher', {
                player_id: msg.player_id,
                max_bet: msg.max_bet,
                team_1_odds: msg.team_1_odds,
                team_2_odds: msg.team_2_odds,
            });
        }
    })
};


contentScriptListener();
socketListener();
