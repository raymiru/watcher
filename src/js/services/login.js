export const loginStart = () => {
    let matchType;
    let liveBetsArea = {
        liveBetBody: false,
        map1: {
            body: false,
            team_1_win: {
                total_bet: 0,
                total_odds: 0,
                total_pwin: 0
            },
            team_2_win: {
                total_bet: 0,
                total_odds: 0,
                total_pwin: 0
            }
        },
        map2: {
            body: false,
            team_1_win: {
                total_bet: 0,
                total_odds: 0,
                total_pwin: 0
            },
            team_2_win: {
                total_bet: 0,
                total_odds: 0,
                total_pwin: 0
            }
        },
        map3: {
            body: false,
            team_1_win: {
                total_bet: 0,
                total_odds: 0,
                total_pwin: 0
            },
            team_2_win: {
                total_bet: 0,
                total_odds: 0,
                total_pwin: 0
            }
        },
        map4: {
            body: false,
            team_1_win: {
                total_bet: 0,
                total_odds: 0,
                total_pwin: 0
            },
            team_2_win: {
                total_bet: 0,
                total_odds: 0,
                total_pwin: 0
            }
        },
        map5: {
            body: false,
            team_1_win: {
                total_bet: 0,
                total_odds: 0,
                total_pwin: 0
            },
            team_2_win: {
                total_bet: 0,
                total_odds: 0,
                total_pwin: 0
            }
        },
    };

    let team_1_win = {
        total_bet: 0,
        total_odds: 0,
        total_pwin: 0
    };

    let team_2_win = {
        total_bet: 0,
        total_odds: 0,
        total_pwin: 0
    };

    const init = () => {
        try {
            // BO
            if (document.querySelector('.bm-bo').innerText) {
                matchType = document.querySelector('.bm-bo').innerText;
            }

            document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div')
            // liveBetBody
            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next')) {
                liveBetsArea.liveBetBody = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next')
            }

            // map 1
            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2)')) {
                liveBetsArea.map1.body = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2)')
                liveBetsArea.map1.team_1_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team1 > div > div.bet-user-summ > span').innerText;
                liveBetsArea.map1.team_2_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team2 > div > div.bet-user-summ > span').innerText;

                liveBetsArea.map1.team_1_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined').innerText;
                liveBetsArea.map1.team_2_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined').innerText

                liveBetsArea.map1.team_1_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span').innerText;
                liveBetsArea.map1.team_2_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span').innerText;
            }


            // map 2
            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3)')) {
                liveBetsArea.map2.body = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3)')
                liveBetsArea.map2.team_1_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team1 > div > div.bet-user-summ > span').innerText;
                liveBetsArea.map2.team_2_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team2 > div > div.bet-user-summ > span').innerText;

                liveBetsArea.map2.team_1_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined').innerText;
                liveBetsArea.map2.team_2_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined').innerText

                liveBetsArea.map2.team_1_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span').innerText;
                liveBetsArea.map2.team_2_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span').innerText;
            }


            // map3
            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4)')) {
                liveBetsArea.map3.body = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4)')
                liveBetsArea.map3.team_1_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team1 > div > div.bet-user-summ > span').innerText;
                liveBetsArea.map3.team_2_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team2 > div > div.bet-user-summ > span').innerText;

                liveBetsArea.map3.team_1_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined').innerText;
                liveBetsArea.map3.team_2_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined').innerText

                liveBetsArea.map3.team_1_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span').innerText;
                liveBetsArea.map3.team_2_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span').innerText;
            }


            // map4
            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5)')) {
                liveBetsArea.map4.body = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5)')
                liveBetsArea.map4.team_1_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team1 > div > div.bet-user-summ > span').innerText;
                liveBetsArea.map4.team_2_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team2 > div > div.bet-user-summ > span').innerText;

                liveBetsArea.map4.team_1_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined').innerText;
                liveBetsArea.map4.team_2_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined').innerText

                liveBetsArea.map4.team_1_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span').innerText;
                liveBetsArea.map4.team_2_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span').innerText;
            }


            // map5
            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6)')) {
                liveBetsArea.map5.body = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6)')
                liveBetsArea.map5.team_1_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team1 > div > div.bet-user-summ > span').innerText;
                liveBetsArea.map5.team_2_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team2 > div > div.bet-user-summ > span').innerText;

                liveBetsArea.map5.team_1_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined').innerText;
                liveBetsArea.map5.team_2_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined').innerText;

                liveBetsArea.map5.team_1_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span').innerText;
                liveBetsArea.map5.team_2_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span').innerText;
            }
        } catch (e) {
            console.log(e)
        }
    };

    init();


    //если существует BO то присваиваем его matchType
    if (matchType) {
        if (matchType === 'BO1') {
            console.log('BO1');
            if (liveBetsArea.liveBetBody) {
                if (liveBetsArea.map1.body) {
                    console.log('Идет карта N1');
                    team_1_win.total_bet = liveBetsArea.map1.team_1_win.total_bet;
                    team_1_win.total_odds = liveBetsArea.map1.team_1_win.total_odds;
                    team_1_win.total_pwin = liveBetsArea.map1.team_1_win.total_pwin;

                    team_2_win.total_bet = liveBetsArea.map1.team_2_win.total_bet;
                    team_2_win.total_odds = liveBetsArea.map1.team_2_win.total_odds;
                    team_2_win.total_pwin = liveBetsArea.map1.team_2_win.total_pwin;
                }
            }
        }
        if (matchType === 'BO3') {
            console.log('BO3')
            if (liveBetsArea.liveBetBody) {
                console.log('Область доп. ставок');
                if (liveBetsArea.map3.body) {
                    console.log('идет карта N3!!!');
                    team_1_win.total_bet = liveBetsArea.map3.team_1_win.total_bet;
                    team_1_win.total_odds = liveBetsArea.map3.team_1_win.total_odds;
                    team_1_win.total_pwin = liveBetsArea.map3.team_1_win.total_pwin;

                    team_2_win.total_bet = liveBetsArea.map3.team_2_win.total_bet;
                    team_2_win.total_odds = liveBetsArea.map3.team_2_win.total_odds;
                    team_2_win.total_pwin = liveBetsArea.map3.team_2_win.total_pwin;

                } else if (liveBetsArea.map2.body && !liveBetsArea.map3.body) {
                    console.log('идет карта N2!!!');
                    team_1_win.total_bet = liveBetsArea.map2.team_1_win.total_bet;
                    team_1_win.total_odds = liveBetsArea.map2.team_1_win.total_odds;
                    team_1_win.total_pwin = liveBetsArea.map2.team_1_win.total_pwin;

                    team_2_win.total_bet = liveBetsArea.map2.team_2_win.total_bet;
                    team_2_win.total_odds = liveBetsArea.map2.team_2_win.total_odds;
                    team_2_win.total_pwin = liveBetsArea.map2.team_2_win.total_pwin;

                } else if (liveBetsArea.map1.body && !liveBetsArea.map2.body && !liveBetsArea.map3.body) {
                    console.log('идет карта N1');
                    team_1_win.total_bet = liveBetsArea.map1.team_1_win.total_bet;
                    team_1_win.total_odds = liveBetsArea.map1.team_1_win.total_odds;
                    team_1_win.total_pwin = liveBetsArea.map1.team_1_win.total_pwin;

                    team_2_win.total_bet = liveBetsArea.map1.team_2_win.total_bet;
                    team_2_win.total_odds = liveBetsArea.map1.team_2_win.total_odds;
                    team_2_win.total_pwin = liveBetsArea.map1.team_2_win.total_pwin;
                }
            }
        }
        if (matchType === 'BO5') {
            console.log('BO5')
            if (liveBetsArea.map5) {
                console.log('идет карта N5')
                team_1_win.total_bet = liveBetsArea.map5.team_1_win.total_bet;
                team_1_win.total_odds = liveBetsArea.map5.team_1_win.total_odds;
                team_1_win.total_pwin = liveBetsArea.map5.team_1_win.total_pwin;

                team_2_win.total_bet = liveBetsArea.map5.team_2_win.total_bet;
                team_2_win.total_odds = liveBetsArea.map5.team_2_win.total_odds;
                team_2_win.total_pwin = liveBetsArea.map5.team_2_win.total_pwin;

            } else if (liveBetsArea.map4 && !liveBetsArea.map5) {
                console.log('Идет карта N4')
                team_1_win.total_bet = liveBetsArea.map4.team_1_win.total_bet;
                team_1_win.total_odds = liveBetsArea.map4.team_1_win.total_odds;
                team_1_win.total_pwin = liveBetsArea.map4.team_1_win.total_pwin;

                team_2_win.total_bet = liveBetsArea.map4.team_2_win.total_bet;
                team_2_win.total_odds = liveBetsArea.map4.team_2_win.total_odds;
                team_2_win.total_pwin = liveBetsArea.map4.team_2_win.total_pwin;

            } else if (liveBetsArea.map3 && !liveBetsArea.map4 && !liveBetsArea.map5) {
                console.log('Идет карта N3')
                team_1_win.total_bet = liveBetsArea.map3.team_1_win.total_bet;
                team_1_win.total_odds = liveBetsArea.map3.team_1_win.total_odds;
                team_1_win.total_pwin = liveBetsArea.map3.team_1_win.total_pwin;

                team_2_win.total_bet = liveBetsArea.map3.team_2_win.total_bet;
                team_2_win.total_odds = liveBetsArea.map3.team_2_win.total_odds;
                team_2_win.total_pwin = liveBetsArea.map3.team_2_win.total_pwin;

            } else if (liveBetsArea.map2 && !liveBetsArea.map3 && !liveBetsArea.map4 && !liveBetsArea.map5) {
                console.log('Идет карта N2')

                team_1_win.total_bet = liveBetsArea.map2.team_1_win.total_bet;
                team_1_win.total_odds = liveBetsArea.map2.team_1_win.total_odds;
                team_1_win.total_pwin = liveBetsArea.map2.team_1_win.total_pwin;

                team_2_win.total_bet = liveBetsArea.map2.team_2_win.total_bet;
                team_2_win.total_odds = liveBetsArea.map2.team_2_win.total_odds;
                team_2_win.total_pwin = liveBetsArea.map2.team_2_win.total_pwin;
            } else if (liveBetsArea.map1 && !liveBetsArea.map2 && !liveBetsArea.map3 && !liveBetsArea.map4 && !liveBetsArea.map5) {
                console.log('Идет карта N1')
                team_1_win.total_bet = liveBetsArea.map1.team_1_win.total_bet;
                team_1_win.total_odds = liveBetsArea.map1.team_1_win.total_odds;
                team_1_win.total_pwin = liveBetsArea.map1.team_1_win.total_pwin;

                team_2_win.total_bet = liveBetsArea.map1.team_2_win.total_bet;
                team_2_win.total_odds = liveBetsArea.map1.team_2_win.total_odds;
                team_2_win.total_pwin = liveBetsArea.map1.team_2_win.total_pwin;

            }
        }
    }


    console.log('Запущена функция loginStart()');
    try {
        chrome.runtime.sendMessage({
            type: "to_background_login",
            steam_username: localStorage['steam_username'],
            player_id: localStorage['player_id'],
            permission: 'player',
            bank: document.querySelector('body > div.layout > div.layout__header > header >' +
                ' div.header__outer > div > div.header__body > div.header__userbar > div > div > ' +
                'div.userbar-user__bars > div > div.action-bars__user-info > div > div.user-info__current-user > div > ' +
                'a.current-user__rating.current-user__rating_mobile > span').innerText
            ,
            team_1_bet: {
                total_bet: team_1_win.total_bet,
                total_odds: team_1_win.total_odds,
                total_pwin: team_1_win.total_pwin
            },
            team_2_bet: {
                total_bet: team_2_win.total_bet,
                total_odds: team_2_win.total_odds,
                total_pwin: team_2_win.total_pwin
            }
        })
    } catch (e) {
        console.log(e)
    }
};
