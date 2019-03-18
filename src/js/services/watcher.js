let team_1_name, team_2_name, team_1_odds, team_2_odds, max_bet, bo;


if (document.querySelector('.t1name')) {
    team_1_name = document.querySelector('.t1name').innerText;
}


if (document.querySelector('.t2name')) {
    team_2_name = document.querySelector('.t2name').innerText;
}

if (document.querySelector('.t2name')) {
    team_1_odds = document.querySelector('.t2name');
}

if (document.querySelector('.t2name')) {
    team_2_odds = document.querySelector('.t2name');
}

if (document.querySelector('.t2name')) {
    max_bet = document.querySelector('.t2name');
}

if (document.querySelector('.bm-bo')) {
    bo = document.querySelector('.bm-bo').innerText;
}

const observerOptions = {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true
};

export const watcherStart = socket => {
    console.log('Запущена функция watcher()');
    sendStaticData(socket);
    sendDynamicData(socket);
};

const sendStaticData = socket => {
    socket.emit('bet_msg_from_watcher', {
        match_url: window.location.href,
        team_1_name,
        team_2_name,
        bo,
        team_1_odds: team_1_odds.innerText,
        team_2_odds: team_2_odds.innerText,
        max_bet: max_bet.innerText
    });
};

const sendDynamicData = socket => {
    sendT1Odds(socket);
    sendT2Odds(socket);
    sendMaxBet(socket);
};

const sendT1Odds = socket => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            socket.emit('bet_msg_from_watcher', {team_1_odds: mutation.target.data})
        })
    });

    observer.observe(team_1_odds, observerOptions)
};

const sendT2Odds = socket => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            socket.emit('bet_msg_from_watcher', {team_2_odds: mutation.target.data})
        })
    });

    observer.observe(team_2_odds, observerOptions)
};

const sendMaxBet = socket => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            socket.emit('bet_msg_from_watcher', {max_bet: mutation.target.data})
        })
    });

    observer.observe(max_bet, observerOptions)
};






