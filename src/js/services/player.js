import {loginStart} from "./login";

let bank;


export const playerStart = () => {
    console.log('Запущена функция playerStart()');
    loginStart();

    chrome.runtime.onMessage.addListener(msg => {
        if (msg.type === 'to_player') {
            console.log('Принимаю сообщения от вебсокета');
            console.log(msg)
            chooseTeam(msg.team_winner);
            setValue(msg.bet_val);
            warningDisable();
            clickCheckbox();
            placeBet();
            setTimeout(refreshPage, 1500);
        }
        if (msg.type === 'url_handler') {
            document.location.href = msg.match_url
        }

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

const clickCheckbox = () => {
    if (document.querySelector('#ch1')) {
        document.querySelector('#ch1').checked = true
    }
};

const updateInfo = () => {
    console.log('Выполнена функция updateInfo');
    console.log(`bank = ${bank}`)
    bank = document.querySelector('body > div.layout > div.layout__header > header > div.header__outer > div > div.header__body > div.header__userbar > div > div > div.userbar-user__bars > div > div.action-bars__user-info > div > div.user-info__current-user > div > a.current-user__rating.current-user__rating_mobile > span').innerText
    chrome.runtime.sendMessage({
        type: "to_background_update_info",
        steam_username: localStorage['steam_username'],
        bank
    })
    console.log(`bank = ${bank}`)
};


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

    try {
        let bet_button = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-buttons > button');
        bet_button.click();
        console.log('Ставка сделана')
    } catch (e) {
        console.log(e);
        console.log('Функция placeBet() не выполнена, т.к. не найдена элемент в DOM')
    }
};


const refreshPage = () => {
    console.log('Перезагружаю страницу')
    window.location.reload();
};


