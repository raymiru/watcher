import {chooseTeam} from "./player";
import {checkSteamLogin} from "./checkSteamLogin";

let team_1_name, team_2_name, team_1_odds, team_2_odds, max_bet, bo, team_1_img, team_2_img;


if (document.querySelector('.t1logo')) {
    team_1_img = document.querySelector('.t1logo').getAttribute('src');
}

if (document.querySelector('.t2logo')) {
    team_2_img = document.querySelector('.t2logo').getAttribute('src');
}


if (document.querySelector('.t1name')) {
    team_1_name = document.querySelector('.t1name').innerText;
}


if (document.querySelector('.t2name')) {
    team_2_name = document.querySelector('.t2name').innerText;
}

if (document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-betbuttons.bet-live > div:nth-child(1) > button > span')) {
    team_1_odds = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-betbuttons.bet-live > div:nth-child(1) > button > span').innerText;
}

if (document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-betbuttons.bet-live > div:nth-child(2) > button > span')) {
    team_2_odds = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-betbuttons.bet-live > div:nth-child(2) > button > span').innerText;
}

if (document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-amounts > div.bet-pop-amount.bet-pop-userbet > div.input-max.bet-pop-right.bet-currency.bet-currency_USD.input-max_max > div > div.input-max__max > span')) {
    max_bet = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-amounts > div.bet-pop-amount.bet-pop-userbet > div.input-max.bet-pop-right.bet-currency.bet-currency_USD.input-max_max > div > div.input-max__max > span');
}

if (document.querySelector('.bm-bo')) {
    bo = document.querySelector('.bm-bo').innerText;
}

const watcherLogin = () => {
    console.log('Запущена функция watcherLogin');
    checkSteamLogin();
    chrome.runtime.sendMessage({
        type: "to_background_login",
        player_id: localStorage['player-id'],
        steam_username: localStorage['steam-username'],
        permission: localStorage['permission'],
    })
};

const winSideListener = () => {
    chrome.runtime.onMessage.addListener(msg => {
        if (msg.type === 'to_watcher') {
            chooseTeam(msg.team_winner)
        }
        if (msg.type === 'url_handler') {
            document.location.href = localStorage['url'] + msg.match_url
        }
        if (msg.type === 'go_back') {
            setTimeout(() => {
                document.location.href = 'https://' + document.location.host
            })
        }
        if (msg.type === 'reload') {
            document.location.reload();
        }
    })
};

export const watcherStart = () => {
    console.log('Обновление 30.03.2019 22:46');
    console.log('Запущена функция watcherStart()');
    try {
        watcherLogin();
        winSideListener();
        sendDynamicData();
        setInterval(sendStaticData, 2000);
    } catch (e) {
    }
};


const sendStaticData = () => {
    console.log('Отправляю static data');
    chrome.runtime.sendMessage({
        type: 'to_background_static',
        player_id: localStorage['player-id'],
        match_url: document.location.pathname,
        team_1_name,
        team_2_name,
        team_1_img,
        team_2_img,
    })
};

const sendDynamicData = () => {

    chooseTeam(1);
    chooseTeam(2);
    sendOdds();
    sendMaxBet();
};

const sendOdds = () => {
    try {
        team_1_odds = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-betbuttons.bet-live > div:nth-child(1) > button > span').innerText;
        team_2_odds = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-betbuttons.bet-live > div:nth-child(2) > button > span').innerText;
        console.log(team_1_odds);
        console.log(team_2_odds);
        chrome.runtime.sendMessage({
            type: 'to_background_dynamic',
            player_id: localStorage['player-id'],
            team_1_odds,
            team_2_odds
        });
        setTimeout(sendOdds, 300);
    } catch (e) {

    }
};

const sendMaxBet = () => {
    try {
        max_bet = document.querySelector("#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-amounts > div.bet-pop-amount.bet-pop-userbet > div.input-max.bet-pop-right.bet-currency.bet-currency_RUB.input-max_max > div > div.input-max__max > span").innerText;
        console.log(`MAX BET : ${max_bet}`);
        chrome.runtime.sendMessage({
            type: 'to_background_dynamic',
            player_id: localStorage['player-id'],
            max_bet
        });
        setTimeout(sendMaxBet, 230);
    } catch (e) {

    }
};






