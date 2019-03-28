import {chooseTeam} from "./player";

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


export const watcherStart = () => {
    console.log('Обновление 27.03.2019 22:46');
    console.log('Запущена функция watcherStart()');
    try {
        chooseTeam(1);
        sendDynamicData();
        setInterval(sendStaticData, 1000);
    } catch (e) {
        console.log(e);
        console.log('Вы находитесь не на странице матча');
    }
};


const sendStaticData = () => {
    console.log('Отправляю static data');
    chrome.runtime.sendMessage({
        type: 'to_background_static',
        match_url: window.location.href,
        team_1_name,
        team_2_name,
        team_1_img,
        team_2_img,
        bo,
        team_1_odds: team_1_odds,
        team_2_odds: team_2_odds,
    })
};

const sendDynamicData = () => {
    console.log('Отправляю dynamic data');
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
            team_1_odds,
            team_2_odds
        });
        setTimeout(sendOdds, 250);
    } catch (e) {
        console.log(e);
        console.log('The game has not started yet or has already ended');
    }
};

const sendMaxBet = () => {
    try {
        max_bet = document.querySelector('#bet_dialog > div.bet-pop.sys-bet-pop > div.bet-pop-amounts > div.bet-pop-amount.bet-pop-userbet > div.input-max.bet-pop-right.bet-currency.bet-currency_USD.input-max_max > div > div.input-max__max > span').innerText;
        console.log(`MAX BET : ${max_bet}`);
        chrome.runtime.sendMessage({
            type: 'to_background_dynamic',
            max_bet
        });
        setTimeout(sendMaxBet, 70);
    } catch (e) {
        console.log(e);
    }
};






