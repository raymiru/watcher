import {loginStart} from "./login";

export const playerStart = socket => {
    console.log('Запущена функция playerStart()');
    loginStart(socket);
    urlHandler(socket);
    socket.on('bet_msg_to_player', msg => {
        console.log('Принимаю сообщения от вебсокета');
        console.log(msg)
        chooseTeam(msg.team_winner);
        setValue(msg.bet_val);
        warningDisable();
        placeBet();
        // refreshPage();
    })
};

export const chooseTeam = team_winner => {
    console.log('Установлен team winner')
    try {
        let T1W = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div > div.bm-team1 > button > div > div > div');
        let T2W = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div > div.bm-team2 > button > div > div > div');
        if (T1W && T2W) {
            if (team_winner === 1) {
                T1W.click()
                console.log('Победитель - команда 1')
            } else if (team_winner === 2) {
                T2W.click();
                console.log('Победитель - команда 2');

            }
        }
    } catch (e) {
        console.log(e)
    }

};

const urlHandler = socket => {
    socket.on('url_handler', msg => {
        document.location.href = msg.match_url
    })
}

const setValue = bet_val => {
    console.log('Установлен bet_val')
    try {
        let bet_input = document.querySelector('.bet-input');
        if (bet_input) bet_input.value = bet_val
    } catch (e) {
        console.log(e)
    }
};

const warningDisable = () => {
    try {
        let warn_popup = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-buttons > button');
        if (warn_popup) {
            warn_popup.removeAttribute('disabled'); // Удаление атрибута disabled
        }
    } catch (e) {
        console.log(e)
    }
};

const placeBet = () => {
    console.log('Ставка сделана')
    try {
        let bet_button = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-buttons > button');
        bet_button.click();

    } catch (e) {
        console.log(e)
        console.log('Функция placeBet() не выполнена, т.к. не найдена элемент в DOM')
    }
};


// const refreshPage = () => {
//     console.log('Перезагружаю страницу')
//     window.location.reload();
// };


