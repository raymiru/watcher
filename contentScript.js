let VAL = 0.1;
let WARNING_POPUP;
let TEAM_WINNER = 1;
let TEAM1_NAME;
let TEAM2_NAME;
let KOEF_T1;
let KOEF_T2;
let MAP_NUM_INFO;
let BET_BUTTON;
let BANK_SELECTOR;
let BO;
let TName;


let PERMISSION;
let WATCHER = false;
let WATCHER_MESSAGE_TYPE = 2;
let PLAYER = false;
let PLAYER_MESSAGE_TYPE = 3;

const COUNTS = {
    CTWEL_Count: 30,
    CBVWE_Count: 50,
    BANK: 10000
};


function getURL() {
    let URL = window.location.href;
    chrome.runtime.sendMessage({
        type: WATCHER_MESSAGE_TYPE,
        match_url: URL
    })
    setTimeout(getURL, 3500);
}


function getBestOf() {
    try {
        console.log('Вызвана функция getBestOf()')
        BO = document.querySelector('.bm-bo').innerText;

        chrome.runtime.sendMessage({
            type: WATCHER_MESSAGE_TYPE,
            bo: BO
        })
        console.log('Функция getBestOf() отправлена в background.js')
        setTimeout(getBestOf, 5000);
    } catch (e) {
        console.log(e)
        console.log('Ошибка работы функции getBestOf()')
    }
}

function getTournamentName() {
    try {
        TName = document.querySelector('#sys-container > div.bm-main.sys-betting.betting-live.betting-bo1.bm-main_stream > div.bm-middle > a > span').innerText;
        if (TName) {
            console.log(TName);
            chrome.runtime.sendMessage({
                type: WATCHER_MESSAGE_TYPE,
                t_name: TName
            })
        } setTimeout(getTournamentName, 2000);
    } catch (e) {
        console.log(e)
    }
}


function getMapNumInfo() {
    try {
        MAP_NUM_INFO = document.querySelector('.bet-event__text-inside').innerText;
        console.log(MAP_NUM_INFO);
        chrome.runtime.sendMessage({
            type: WATCHER_MESSAGE_TYPE,
            map_num_info: MAP_NUM_INFO
        });
        setTimeout(getMapNumInfo, 2000);
    } catch (e) {
        chrome.runtime.sendMessage({
            type: WATCHER_MESSAGE_TYPE,
            map_num_info: 'The game has not started yet or has already ended'
        })
    }
}

function getNamesOfTeams() {
    try {
        TEAM1_NAME = document.querySelector('div.sys-t1name').innerText;
        console.log(TEAM1_NAME);


        TEAM2_NAME = document.querySelector('div.sys-t2name').innerText;
        console.log(TEAM2_NAME)

        chrome.runtime.sendMessage({
            type: WATCHER_MESSAGE_TYPE,
            team_1_name: TEAM1_NAME,
            team_2_name: TEAM2_NAME
        })
        setTimeout(getNamesOfTeams, 3500);

    } catch (e) {
        console.log(e)
        chrome.runtime.sendMessage({
            type: WATCHER_MESSAGE_TYPE,
            team_1_name: e,
            team_2_name: e
        })
    }
}

function warningPopupDisable() {
    try {
        WARNING_POPUP = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-buttons > button');
        console.log(WARNING_POPUP.hasAttribute('disabled'));
        WARNING_POPUP.removeAttribute('disabled'); // Удаление атрибута disabled
    } catch (e) {
        console.log(e)
    }
}


function chooseTeamWhenExistLive(TEAM_WINNER) {
    console.log('function chooseTeamWhenExistLive');
    try {
        let T1W = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div > div.bm-team1 > button > div > div > div');
        let T2W = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div > div.bm-team2 > button > div > div > div');
        if (T1W && T2W) {
            if (TEAM_WINNER == 1) {
                T1W.click();


            } else if (TEAM_WINNER == 2) {
                T2W.click();


            } else if (COUNTS.CTWEL_Count-- > 0) {
                setTimeout(chooseBetValueWhenExist, 40)
            }
        }
    } catch (e) {
        console.log(e)
    }

}

function getKoef() {
    try {
        KOEF_T1 = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-betbuttons.bet-live > div:nth-child(1) > button > span').innerText;
        KOEF_T2 = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-betbuttons.bet-live > div:nth-child(2) > button > span').innerText;
        console.log(KOEF_T1);
        console.log(KOEF_T2);
        chrome.runtime.sendMessage({
            type: WATCHER_MESSAGE_TYPE,
            koef_t1: KOEF_T1,
            koef_t2: KOEF_T2
        });

        setTimeout(getKoef, 300);
    } catch (e) {
        console.log(e);
        console.log('The game has not started yet or has already ended');
    }

}

function getMaxBet() {
    try {
        let MAX_BET = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-amounts > div.bet-pop-amount.bet-pop-userbet > div.input-max.bet-pop-right.bet-currency.bet-currency_USD.input-max_max > div > div.input-max__max > span').innerText;
        chrome.runtime.sendMessage({
            type: WATCHER_MESSAGE_TYPE,
            max_bet: MAX_BET
        })
        setTimeout(getMaxBet, 400);
    } catch (e) {
        console.log(e);
    }
}


function chooseBetValueWhenExist(val) {
    console.log('function chooseBetValueWhenExist');
    try {
        console.log('F2')
        let BET_INPUT = document.querySelector('.bet-input');
        if (BET_INPUT) {
            BET_INPUT.value = val
            warningPopupDisable();
        } else if (COUNTS.CBVWE_Count-- > 0) {
            setTimeout(chooseBetValueWhenExist, 60);
        }
    } catch (e) {
        console.log(e)
    }
}

function closePopup() {
    try {
        let CLOSE_POPUP = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-closepopup');
        if (CLOSE_POPUP) CLOSE_POPUP.click();
    } catch (e) {
        console.log(e)
    }

}

function placeOdds() {
    try {
        let PLACE_ODDS_T1 = document.querySelector('#bm-additionals > div:nth-child(1) > div > div.bma-bet.sys-betting.betting-user-team1.betting-won-team2.betting-past > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined');
        let PLACE_ODDS_T2 = document.querySelector('#bm-additionals > div:nth-child(1) > div > div.bma-bet.sys-betting.betting-user-team1.betting-won-team2.betting-past > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined');
        chrome.runtime.sendMessage({
            place_odds_t1: PLACE_ODDS_T1.innerText,
            place_odds_t2: PLACE_ODDS_T2.innerText
        });
        setTimeout(placeOdds, 1000);
    } catch (e) {
        console.log(e)
    }

}


function userPlaceSumm() {
    try {
        let PLACE_SUMM_T1 = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div.bma-bet.sys-betting.betting-live.betting-user-team1 > div.bm-team1 > div > div.bet-user-summ > span');
        let PLACE_SUMM_T2 = document.querySelector('#bm-additionals > div:nth-child(1) > div > div.bma-bet.sys-betting.betting-user-team1.betting-won-team2.betting-past > div.bm-team2 > div > div.bet-user-summ > span');

        chrome.runtime.sendMessage({
            place_summ_t1: PLACE_SUMM_T1.innerText,
            place_summ_t2: PLACE_SUMM_T2.innerText
        })
        setTimeout(userPlaceSumm, 1000);
    } catch (e) {
        console.log(e)
    }

}

function userEarnSumm() {
    try {
        let EARN_SUMM_T1 = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div.bma-bet.sys-betting.betting-live.betting-user-team1 > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span');
        let EARN_SUMM_T2 = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div.bma-bet.sys-betting.betting-live.betting-user-team1 > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span');
        chrome.runtime.sendMessage({
            type: WATCHER_MESSAGE_TYPE,
            earn_summ_t1: EARN_SUMM_T1.innerText,
            earn_summ_t2: EARN_SUMM_T2.innerText
        })
        setTimeout(userEarnSumm, 1000);
    } catch (e) {
        console.log(e)
    }
}


function placeBet() {
    console.log('function placeBet()');
    try {
        BET_BUTTON = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-buttons > button');
        BET_BUTTON.click();

    } catch (e) {
        console.log(e)
        console.log('Функция placeBet() не выполнена, т.к. не найдена элемент в DOM')
    }
}

function getBank() {
    BANK_SELECTOR = document.querySelector('body > div.layout > div.layout__header > header > div.header__outer > div > div.header__body > div.header__userbar > div > div > div.userbar-user__bars > div > div.action-bars__user-info > div > div.user-info__current-user > div > a.current-user__rating.current-user__rating_mobile > span')
    chrome.runtime.sendMessage({
        type: PLAYER_MESSAGE_TYPE,
        bank: BANK_SELECTOR.innerText
    })
    if (COUNTS.BANK-- > 0) setTimeout(getBank, 10000);

}

function setPermission() {
    chrome.runtime.onMessage.addListener(msg => {
        console.log(msg)
        if (msg.type === 0) {
            PERMISSION = msg.permission;
            console.log(msg.type)
            console.log(`PERMISSION = ${PERMISSION}`)
        }
    })
}

function urlListener() {
    console.log('urlListener()');
    chrome.runtime.onMessage.addListener(msg => {
        if (msg.type === 111) {
            PERMISSION = 'player';
            console.log('URL LISTENER V DELE');
            document.location.href = msg.match_url;
            setTimeout(start, 5000);
            console.log('urlListener() setTimeout(start, 5000)')
        }
    })
}

function startListener() {
    console.log('function startListener() ')
    chrome.runtime.onMessage.addListener(msg => {
        if (msg.type === 1) {
            start();
        }
    })
}

function betInfoListener() {
    console.log('function betInfoListener')
    chrome.runtime.onMessage.addListener(msg => {
        if (msg.type === 110) {
            console.log('msg type === 110')
            chooseTeamWhenExistLive(msg.team_winner);
            chooseBetValueWhenExist(msg.bet_val);
            placeBet();
        }
    })

}

function watcher() {
    getURL();
    // getTournamentName();
    getBestOf();
    getNamesOfTeams();
    getMapNumInfo();
    chooseTeamWhenExistLive(1);
    getKoef();
    getMaxBet();
}


function player() {
    getBank();
    userPlaceSumm();
    userEarnSumm();
    placeOdds();
    betInfoListener();
}


function start() {
    if (PERMISSION === 'watcher') {
        console.log('WATCHER >>>>');
        watcher();
    } else if (PERMISSION === 'player') {
        console.log('PLAYER >>>>');
        player()
    }
}

setPermission();
startListener();
urlListener();














