const socket = io.connect('http://localhost:4000');


socket.on('bet_msg_to_player', msg => {

    console.log(msg)
    chrome.tabs.query({currentWindow: true, index: 0}, tabs => {
        let activeTabs = tabs[0];
        chrome.tabs.sendMessage(activeTabs.id, {
            type: 110,
            team_winner: msg.team_winner,
            bet_val: msg.bet_val
        })
    })
})

socket.on('url_handler', msg => {
    console.log('url_handler')
    chrome.tabs.query({currentWindow: true, index: 0}, tabs => {
        let activeTabs = tabs[0];
        chrome.tabs.sendMessage(activeTabs.id, {
            type: 111,
            match_url: msg.match_url
        })
    })
});

chrome.runtime.onMessage.addListener(msg => {

    if (msg.type === 9) {
        socket.emit('register', {
            steam_username: localStorage['player'],
            permission: 'player'
        })
        chrome.tabs.query({currentWindow: true, active: true}, tabs => {
            let activeTabs = tabs[0];
            chrome.tabs.sendMessage(activeTabs.id, {
                type: 0,
                permission: 'player'
            })
        })

    }

        // msg.type === 0 регистарция в админ системе и установка прав (watcher/player)
        // Message from popup
        if (msg.type === 0) {
            localStorage['player'] = msg.steam_username;
            console.log(localStorage['player']);
            socket.emit('register', {
                steam_username: msg.steam_username,
                permission: msg.permission
            });
            chrome.tabs.query({currentWindow: true, active: true}, tabs => {
                let activeTabs = tabs[0];
                chrome.tabs.sendMessage(activeTabs.id, {
                    type: msg.type,
                    permission: msg.permission
                })
            })

            // msg.type === 1 - активация watcher
            // Message from popup
        } else if (msg.type === 1) {
            chrome.tabs.query({currentWindow: true, active: true}, tabs => {
                let activeTabs = tabs[0];
                chrome.tabs.sendMessage(activeTabs.id, {
                    type: msg.type,
                    watcher: msg.watcher
                })
            })

            // Message from contentScript
            // msg.type === 2 - данные он контект скрипта админ сервису
        } else if (msg.type === 2) {
            socket.emit('bet_msg_from_watcher', {
                match_url: msg.match_url,
                t_name: msg.t_name,
                map_num_info: msg.map_num_info,
                team_1_name: msg.team_1_name,
                team_2_name: msg.team_2_name,
                bo: msg.bo,
                koef_t1: msg.koef_t1,
                koef_t2: msg.koef_t2,
                max_bet: msg.max_bet
            })
        } else if (msg.type === 3) {
            socket.emit('bet_msg_from_player', {
                bank: msg.bank,
                place_summ_t1: msg.place_summ_t1,
                place_summ_t2: msg.place_summ_t2,
                earn_summ_t1: msg.earn_summ_t1,
                earn_summ_t2: msg.earn_summ_t2,
                place_odds_t1: msg.place_odds_t1,
                place_odds_t2: msg.place_odds_t2
            })
        }
    }
);


