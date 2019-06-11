export const loginStart = () => {


    let team_1_win = {
        total_bet: 0,
        total_pwin: 0
    };

    let team_2_win = {
        total_bet: 0,
        total_pwin: 0
    };

    const liveNumberStrings = {
        map: 'LIVE на матч',
        map1: 'LIVE на карту #1',
        map2: 'LIVE на карту #2',
        map3: 'LIVE на карту #3',
        map4: 'LIVE на карту #4',
        map5: 'LIVE на карту #5',
        map6: 'LIVE на карту #6',
        map7: 'LIVE на карту #7',
    };


    const takeLiveNumber = () => {

    };

    const Init = () => {
        try {
            let liveNumberString = ''.padStart(16, document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div').innerText)

            let bo1String = ''.padStart(12, document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div').innerText)

            let watchNumberString = '';

            let kingChild = null;

            let childs = {
                child0: null,
                child2: null,
                child3: null,
                child4: null,
                child5: null,
                child6: null,

            };

            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2)')) {
                childs.child2 = ''.padStart(16, document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2)').innerText)
                childs.child0 = ''.padStart(12, document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2)').innerText)
            }
            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3)')) {
                childs.child3 = ''.padStart(16, document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3)').innerText)
            }
            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4)')) {
                childs.child4 = ''.padStart(16, document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4)').innerText)
            }
            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5)')) {
                childs.child5 = ''.padStart(16, document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5)').innerText)
            }
            if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6)')) {
                childs.child6 = ''.padStart(16, document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6)').innerText)
            }


            if (bo1String === childs.child0) {
                kingChild = 2
            }
            if (liveNumberString === childs.child2) {
                kingChild = 2
            }
            if (liveNumberString === childs.child3) {
                kingChild = 3
            }
            if (liveNumberString === childs.child4) {
                kingChild = 4
            }
            if (liveNumberString === childs.child5) {
                kingChild = 5
            }
            if (liveNumberString === childs.child6) {
                kingChild = 6
            }

            team_1_win.total_bet = document.querySelector(`#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(${kingChild}) > div.bm-team1 > div > div.bet-user-summ > span`).innerText;
            team_2_win.total_bet = document.querySelector(`#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(${kingChild}) > div.bm-team2 > div > div.bet-user-summ > span`).innerText;
            team_1_win.total_pwin = document.querySelector(`#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(${kingChild}) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span`).innerText;
            team_2_win.total_pwin = document.querySelector(`#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(${kingChild}) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span`).innerText;


        } catch (e) {
            console.log(e)
        }

        console.log('Запущена функция loginStart()');

        chrome.runtime.sendMessage({
            type: "to_background_login",
            steam_username: localStorage['steam-username'],
            player_id: localStorage['player-id'],
            permission: localStorage['permission'],
            bank: document.querySelector('body > div.layout > div.layout__header > header >' +
                ' div.header__outer > div > div.header__body > div.header__userbar > div > div > ' +
                'div.userbar-user__bars > div > div.action-bars__user-info > div > div.user-info__current-user > div > ' +
                'a.current-user__rating.current-user__rating_mobile > span').innerText
            ,
            team_1_bet: {
                total_bet: team_1_win.total_bet,
                total_pwin: team_1_win.total_pwin
            },
            team_2_bet: {
                total_bet: team_2_win.total_bet,
                total_pwin: team_2_win.total_pwin
            }
        })


    }
    Init();
}


//         if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div') && document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2)')) {
//             liveNumberString = liveNumberString.padStart(16, document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div').innerText);
//             watchNumberString = watchNumberString.padStart(16, document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2)').innerText);
//
//             if (liveNumberString === watchNumberString) {
//                 console.log('Live ставка сделана')
//             } else {
//
//             }
//         }
//     }
//
//
//     const map1 = () => {
//
//     };
//
//     const map2 = () => {
//
//     };
//
//     const map3 = () => {
//
//     };
//
//     const map4 = () => {
//
//     };
//
//     const map5 = () => {
//
//     };
//
//     const map6 = () => {
//
//     };
//
//     const map7 = () => {
//
//     }
//
//
//     const init = () => {
//         try {
//             // BO
//             if (document.querySelector('.bm-bo').innerText) {
//                 matchType = document.querySelector('.bm-bo').innerText;
//             }
//
//             document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div > div')
//             // liveBetBody
//             if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next')) {
//                 liveBetsArea.liveBetBody = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next')
//             }
//
//             // map 1
//             if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2)')) {
//                 liveBetsArea.map1.body = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2)')
//                 liveBetsArea.map1.team_1_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team1 > div > div.bet-user-summ > span').innerText;
//                 liveBetsArea.map1.team_2_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team2 > div > div.bet-user-summ > span').innerText;
//
//                 liveBetsArea.map1.team_1_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined').innerText;
//                 liveBetsArea.map1.team_2_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined').innerText
//
//                 liveBetsArea.map1.team_1_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span').innerText;
//                 liveBetsArea.map1.team_2_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(2) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span').innerText;
//             }
//
//
//             // map 2
//             if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3)')) {
//                 liveBetsArea.map2.body = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3)')
//                 liveBetsArea.map2.team_1_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team1 > div > div.bet-user-summ > span').innerText;
//                 liveBetsArea.map2.team_2_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team2 > div > div.bet-user-summ > span').innerText;
//
//                 liveBetsArea.map2.team_1_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined').innerText;
//                 liveBetsArea.map2.team_2_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined').innerText
//
//                 liveBetsArea.map2.team_1_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span').innerText;
//                 liveBetsArea.map2.team_2_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(3) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span').innerText;
//             }
//
//
//             // map3
//             if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4)')) {
//                 liveBetsArea.map3.body = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4)')
//                 liveBetsArea.map3.team_1_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team1 > div > div.bet-user-summ > span').innerText;
//                 liveBetsArea.map3.team_2_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team2 > div > div.bet-user-summ > span').innerText;
//
//                 liveBetsArea.map3.team_1_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined').innerText;
//                 liveBetsArea.map3.team_2_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined').innerText
//
//                 liveBetsArea.map3.team_1_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span').innerText;
//                 liveBetsArea.map3.team_2_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(4) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span').innerText;
//             }
//
//
//             // map4
//             if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5)')) {
//                 liveBetsArea.map4.body = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5)')
//                 liveBetsArea.map4.team_1_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team1 > div > div.bet-user-summ > span').innerText;
//                 liveBetsArea.map4.team_2_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team2 > div > div.bet-user-summ > span').innerText;
//
//                 liveBetsArea.map4.team_1_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined').innerText;
//                 liveBetsArea.map4.team_2_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined').innerText
//
//                 liveBetsArea.map4.team_1_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span').innerText;
//                 liveBetsArea.map4.team_2_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(5) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span').innerText;
//             }
//
//
//             // map5
//             if (document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6)')) {
//                 liveBetsArea.map5.body = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6)')
//                 liveBetsArea.map5.team_1_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team1 > div > div.bet-user-summ > span').innerText;
//                 liveBetsArea.map5.team_2_win.total_bet = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team2 > div > div.bet-user-summ > span').innerText;
//
//                 liveBetsArea.map5.team_1_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team1 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-1.bet-currency.bet-currency_undefined').innerText;
//                 liveBetsArea.map5.team_2_win.total_odds = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team2 > button > div.btn-bet-head > div.bm-fullbet-summ-cy.sys-stat-abs-2.bet-currency.bet-currency_undefined').innerText;
//
//                 liveBetsArea.map5.team_1_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team1 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-1.bet-user-earn-summ > span').innerText;
//                 liveBetsArea.map5.team_2_win.total_pwin = document.querySelector('#bm-additionals > div.bm-additional.bm-additional-common.a-betting-next > div > div:nth-child(6) > div.bm-team2 > div > div.bet-user-earn > div.sys-bet-user-earn-summ-2.bet-user-earn-summ > span').innerText;
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     };
//
//     init();
//
//
//     //если существует BO то присваиваем его matchType
//     if (matchType) {
//         if (matchType === 'BO1') {
//             console.log('BO1');
//             if (liveBetsArea.liveBetBody) {
//                 if (liveBetsArea.map1.body) {
//                     console.log('Идет карта N1');
//                     team_1_win.total_bet = liveBetsArea.map1.team_1_win.total_bet;
//                     team_1_win.total_odds = liveBetsArea.map1.team_1_win.total_odds;
//                     team_1_win.total_pwin = liveBetsArea.map1.team_1_win.total_pwin;
//
//                     team_2_win.total_bet = liveBetsArea.map1.team_2_win.total_bet;
//                     team_2_win.total_odds = liveBetsArea.map1.team_2_win.total_odds;
//                     team_2_win.total_pwin = liveBetsArea.map1.team_2_win.total_pwin;
//                 }
//             }
//         }
//         if (matchType === 'BO3') {
//             console.log('BO3')
//             if (liveBetsArea.liveBetBody) {
//                 console.log('Область доп. ставок');
//                 if (liveBetsArea.map3.body) {
//                     console.log('идет карта N3!!!');
//                     team_1_win.total_bet = liveBetsArea.map3.team_1_win.total_bet;
//                     team_1_win.total_odds = liveBetsArea.map3.team_1_win.total_odds;
//                     team_1_win.total_pwin = liveBetsArea.map3.team_1_win.total_pwin;
//
//                     team_2_win.total_bet = liveBetsArea.map3.team_2_win.total_bet;
//                     team_2_win.total_odds = liveBetsArea.map3.team_2_win.total_odds;
//                     team_2_win.total_pwin = liveBetsArea.map3.team_2_win.total_pwin;
//
//                 } else if (liveBetsArea.map2.body && !liveBetsArea.map3.body) {
//                     console.log('идет карта N2!!!');
//                     team_1_win.total_bet = liveBetsArea.map2.team_1_win.total_bet;
//                     team_1_win.total_odds = liveBetsArea.map2.team_1_win.total_odds;
//                     team_1_win.total_pwin = liveBetsArea.map2.team_1_win.total_pwin;
//
//                     team_2_win.total_bet = liveBetsArea.map2.team_2_win.total_bet;
//                     team_2_win.total_odds = liveBetsArea.map2.team_2_win.total_odds;
//                     team_2_win.total_pwin = liveBetsArea.map2.team_2_win.total_pwin;
//
//                 } else if (liveBetsArea.map1.body && !liveBetsArea.map2.body && !liveBetsArea.map3.body) {
//                     console.log('идет карта N1');
//                     team_1_win.total_bet = liveBetsArea.map1.team_1_win.total_bet;
//                     team_1_win.total_odds = liveBetsArea.map1.team_1_win.total_odds;
//                     team_1_win.total_pwin = liveBetsArea.map1.team_1_win.total_pwin;
//
//                     team_2_win.total_bet = liveBetsArea.map1.team_2_win.total_bet;
//                     team_2_win.total_odds = liveBetsArea.map1.team_2_win.total_odds;
//                     team_2_win.total_pwin = liveBetsArea.map1.team_2_win.total_pwin;
//                 }
//             }
//         }
//         if (matchType === 'BO5') {
//             console.log('BO5')
//             if (liveBetsArea.map5) {
//                 console.log('идет карта N5')
//                 team_1_win.total_bet = liveBetsArea.map5.team_1_win.total_bet;
//                 team_1_win.total_odds = liveBetsArea.map5.team_1_win.total_odds;
//                 team_1_win.total_pwin = liveBetsArea.map5.team_1_win.total_pwin;
//
//                 team_2_win.total_bet = liveBetsArea.map5.team_2_win.total_bet;
//                 team_2_win.total_odds = liveBetsArea.map5.team_2_win.total_odds;
//                 team_2_win.total_pwin = liveBetsArea.map5.team_2_win.total_pwin;
//
//             } else if (liveBetsArea.map4 && !liveBetsArea.map5) {
//                 console.log('Идет карта N4')
//                 team_1_win.total_bet = liveBetsArea.map4.team_1_win.total_bet;
//                 team_1_win.total_odds = liveBetsArea.map4.team_1_win.total_odds;
//                 team_1_win.total_pwin = liveBetsArea.map4.team_1_win.total_pwin;
//
//                 team_2_win.total_bet = liveBetsArea.map4.team_2_win.total_bet;
//                 team_2_win.total_odds = liveBetsArea.map4.team_2_win.total_odds;
//                 team_2_win.total_pwin = liveBetsArea.map4.team_2_win.total_pwin;
//
//             } else if (liveBetsArea.map3 && !liveBetsArea.map4 && !liveBetsArea.map5) {
//                 console.log('Идет карта N3')
//                 team_1_win.total_bet = liveBetsArea.map3.team_1_win.total_bet;
//                 team_1_win.total_odds = liveBetsArea.map3.team_1_win.total_odds;
//                 team_1_win.total_pwin = liveBetsArea.map3.team_1_win.total_pwin;
//
//                 team_2_win.total_bet = liveBetsArea.map3.team_2_win.total_bet;
//                 team_2_win.total_odds = liveBetsArea.map3.team_2_win.total_odds;
//                 team_2_win.total_pwin = liveBetsArea.map3.team_2_win.total_pwin;
//
//             } else if (liveBetsArea.map2 && !liveBetsArea.map3 && !liveBetsArea.map4 && !liveBetsArea.map5) {
//                 console.log('Идет карта N2')
//
//                 team_1_win.total_bet = liveBetsArea.map2.team_1_win.total_bet;
//                 team_1_win.total_odds = liveBetsArea.map2.team_1_win.total_odds;
//                 team_1_win.total_pwin = liveBetsArea.map2.team_1_win.total_pwin;
//
//                 team_2_win.total_bet = liveBetsArea.map2.team_2_win.total_bet;
//                 team_2_win.total_odds = liveBetsArea.map2.team_2_win.total_odds;
//                 team_2_win.total_pwin = liveBetsArea.map2.team_2_win.total_pwin;
//             } else if (liveBetsArea.map1 && !liveBetsArea.map2 && !liveBetsArea.map3 && !liveBetsArea.map4 && !liveBetsArea.map5) {
//                 console.log('Идет карта N1')
//                 team_1_win.total_bet = liveBetsArea.map1.team_1_win.total_bet;
//                 team_1_win.total_odds = liveBetsArea.map1.team_1_win.total_odds;
//                 team_1_win.total_pwin = liveBetsArea.map1.team_1_win.total_pwin;
//
//                 team_2_win.total_bet = liveBetsArea.map1.team_2_win.total_bet;
//                 team_2_win.total_odds = liveBetsArea.map1.team_2_win.total_odds;
//                 team_2_win.total_pwin = liveBetsArea.map1.team_2_win.total_pwin;
//
//             }
//         }
//     }
//
//


