import {loginStart} from "./login";
import {checkSteamLogin} from "./checkSteamLogin";
import Chance from 'chance'

const chance = new Chance();


let bank;
let steamPage = false;

export const playerStart = () => {
    console.log('Запущена функция playerStart()');
    loginStart();
    checkSteamLogin();
    chrome.runtime.onMessage.addListener(msg => {
        if (msg.type === 'to_player') {
            console.log('Принимаю сообщения от вебсокета');
            console.log(msg)
            chooseTeam(msg.team_winner);
            setValue(msg.bet_val);
            checkEmail()
            warningDisable();
            clickCheckbox();
            placeBet(msg.delay);
            setTimeout(loginStart, 2100);
        }
        if (msg.type === 'url_handler') {
            setTimeout(() => {
                document.location.href = localStorage['url'] + msg.match_url
            }, chance.integer({min: 100, max: 2600}))
        }
        if (msg.type === 'go_back') {
            setTimeout(() => {
                document.location.href = 'https://' + document.location.host
            }, chance.integer({min: 50, max: 5500}))
        }

        // chrome.tabs.getCurrent(function(tab) {
        //     chrome.tabs.remove(tab.id)
        // })
        if (msg.type === 'reload') {
            setTimeout(() => {
                document.location.reload();
            }, chance.integer({min: 50, max: 1100}))
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

const checkEmail = () => {
    if (document.querySelector("#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-warning.bet-pop-email > input[type=text]")) {
        document.querySelector("#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-warning.bet-pop-email > input[type=text]").value = localStorage['email'];
    }
}

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

const placeBet = (delay) => {

    try {
        console.log(delay)
        let bet_button = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-buttons > button');
        setTimeout(() => {

            bet_button.click();
            console.log('Ставка сделана')
        }, delay)
    } catch (e) {
        console.log(e);
        console.log('Функция placeBet() не выполнена, т.к. не найдена элемент в DOM')
    }
};


const refreshPage = () => {
    console.log('Перезагружаю страницу')
    window.location.reload();
};


