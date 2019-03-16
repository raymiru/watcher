//koef t2 jspath document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div > div.bm-team2 > button > div > div > div')
//koef t1 jspath document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div > div.bm-team1 > button > div > div > div')

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








function getURL() {
    let URL = window.location.href;
    chrome.runtime.sendMessage({
        type: WATCHER_MESSAGE_TYPE,
        match_url: URL
    })
}


function getBestOf() {
    BO = document.querySelector('.bm-bo').innerText;
    console.log(BO);
    chrome.runtime.sendMessage({
        type: WATCHER_MESSAGE_TYPE,
        bo: BO
    })
}

function getTournamentName() {
    TName = document.querySelector('.bm-champpic-text').innerText;
    console.log(TName);
    chrome.runtime.sendMessage({
        type: WATCHER_MESSAGE_TYPE,
        t_name: TName
    })
}



function getMapNumInfo() {
    try {
        MAP_NUM_INFO = document.querySelector('.bet-event__text-inside').innerText;
        console.log(MAP_NUM_INFO);
        chrome.runtime.sendMessage({
            type: WATCHER_MESSAGE_TYPE,
            map_num_info: MAP_NUM_INFO
        })
    } catch (e) {
        console.log(e);
        console.log('The game has not started yet or has already ended');
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

    try {
        let count = 30;
        let T1W = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div > div.bm-team1 > button > div > div > div');
        let T2W = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div > div.bm-team2 > button > div > div > div');
        if (T1W && T2W) {
            if (TEAM_WINNER == 1) {
                T1W.click();



            } else if (TEAM_WINNER == 2) {
                T2W.click();



            } else if (count-- > 0) {
                setTimeout(chooseBetValueWhenExist, 40)
            }
        }
    } catch (e) {
        console.log(e)
    }

}

function getKoef() {
    try {
        let count = 100000;
        KOEF_T1 = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-betbuttons.bet-live > div:nth-child(1) > button > span').innerText;
        KOEF_T2 = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-betbuttons.bet-live > div:nth-child(2) > button > span').innerText;
        console.log(KOEF_T1);
        console.log(KOEF_T2);
        chrome.runtime.sendMessage({
            type: WATCHER_MESSAGE_TYPE,
            koef_t1: KOEF_T1,
            koef_t2: KOEF_T2
        });

        if (count-- > 0) {
            setTimeout(getKoef, 250);
        }
    } catch (e) {
        console.log(e);
        console.log('The game has not started yet or has already ended');
    }

}

function getMaxBet() {
    try {

    } catch (e) {
        console.log(e);
    }
}

function chooseBetValueWhenExist(val) {
    try {
        let count = 50;
        console.log('F2')
        let BET_INPUT = document.querySelector('.bet-input');
        if (BET_INPUT) {
            BET_INPUT.value = val
        } else if (count-- > 0) {
            setTimeout(chooseBetValueWhenExist, 60);
        }
    } catch (e) {
        console.log(e)
    }
}

function placeBet() {
    try {
        BET_BUTTON = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-buttons > button');
        BET_BUTTON.click();
    } catch (e) {
        console.log(e)
    }
}

function getBank() {
    BANK_SELECTOR = document.querySelector('body > div.layout > div.layout__header > header > div.header__outer > div > div.header__body > div.header__userbar > div > div > div.userbar-user__bars > div > div.action-bars__user-info > div > div.user-info__current-user > div > a.current-user__rating.current-user__rating_mobile > span')
    let count = 10000;
    chrome.runtime.sendMessage({
        type: PLAYER_MESSAGE_TYPE,
        bank: BANK_SELECTOR.innerText
    })
    if (count-- > 0) setTimeout(getBank, 10000);
    // let mutationObserver = new MutationObserver(mutations => {
    //     mutations.forEach(mutation => {
    //         bank = mutation.target.data;
    //         console.log(mutation);
    //         chrome.runtime.sendMessage({
    //             bank
    //         })
    //     })
    // });
    //
    // let config = {
    //     attributes: true,
    //     characterData: true,
    //     childList: true,
    //     subtree: true,
    //     attributeOldValue: true,
    //     characterDataOldValue: true
    // };
    //
    // mutationObserver.observe(BANK_SELECTOR, config);
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

function startListener() {
    console.log('START LISTENER')
    chrome.runtime.onMessage.addListener(msg => {
        if (msg.type === 1) {
            start();
        }
    })
}

function start() {
    if (PERMISSION === 'watcher') {
        console.log('WATCHER >>>>')
        watcher();
    }
    else if (PERMISSION === 'player') {
        console.log('PLAYER >>>>')
        player()
    }
}


function betInfoListener() {

    chrome.runtime.onMessage.addListener(msg => {
        try {
            if (msg.type === 110) {
                console.log('BET LISTENER')
                chooseTeamWhenExistLive(msg.team_winner);
                chooseBetValueWhenExist(msg.bet_val);
                warningPopupDisable();
                placeBet();
            }
        } catch (e) {
            console.log('Match not started')
        }

    })

}


function watcher() {

    getBank();
    getURL();
    getTournamentName();
    getBestOf();
    getNamesOfTeams();
    getMapNumInfo();
    chooseTeamWhenExistLive(1)
    getKoef()
}


function player() {
    getBank();
    betInfoListener();
}

setPermission();
startListener();















