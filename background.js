const socket = io.connect('http://localhost:4000/');





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

chrome.runtime.onMessage.addListener(msg => {

        // msg.type === 0 регистарция в админ системе и установка прав (watcher/player)
        // Message from popup
        if (msg.type === 0) {
            socket.emit('register', {
                user_id: parseInt(msg.user_id, 10),
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
            })
        } else if (msg.type === 3) {
            socket.emit('bet_msg_from_player', {
                bank: msg.bank
            })
        }
    }
);


