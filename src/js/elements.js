import cssPath from 'css-path'

// const ELEMENTS = {
//     NOW_MATCHES: {
//         CONTAINER: null,
//         BET_ITEMS: [],
//         CURRENT_NUMBER_OF_ITEMS: 0
//     },
// };

const EXPORT_BET_ITEMS = [];


const nowLiveMatchesExist = () => {
    return document.querySelector("#bets-block > div.tabs-container > div.tabs-container__content > div.timerange.timerange_now.sys-timerange > div.timerange__content > div > div").children[0].innerText !== 'Нет активных матчей';
};


const nowLiveMatchesArray = () => {
    const ELEMENTS = {
        NOW_MATCHES: {
            CONTAINER: null,
            BET_ITEMS: [],
        },
    };
    if (nowLiveMatchesExist()) {
        ELEMENTS.NOW_MATCHES.CONTAINER = document.querySelector("#bets-block > div.tabs-container > div.tabs-container__content > div.timerange.timerange_now.sys-timerange > div.timerange__content > div");

        for (let i = 0; i < ELEMENTS.NOW_MATCHES.CONTAINER.children.length; i++) {
            ELEMENTS.NOW_MATCHES.BET_ITEMS.push(ELEMENTS.NOW_MATCHES.CONTAINER.children[i]);
        }
    }

    return ELEMENTS
};


const nullFillExportedArray = (ELEMENTS) => {
    ELEMENTS.NOW_MATCHES.BET_ITEMS.forEach((elem, index) => {
        EXPORT_BET_ITEMS[index] = {
            BLOCK_CSS_PATH: null,
            DATA_ID: null,
            STATUS: null,
            TOURNAMENT_LOGO: null,
            TEAM_A: {
                NAME: null,
                LOGO: null,
                BET_BUTTON_CSS_PATH: null
            },
            TEAM_B: {
                NAME: null,
                LOGO: null,
                BET_BUTTON_CSS_PATH: null
            },
            MATCH_CONTROLS: {
                STREAM_CSS_PATH: null,
                GRAPH_CSS_PATH: null,
                ADDITIONAL_EVENTS_CSS_PATH: null
            }
        }
    });
    return ELEMENTS
};

const fullFillExportedArray = (ELEMENTS) => {
    try {
        for (let item in EXPORT_BET_ITEMS) {
            // css path
            EXPORT_BET_ITEMS[item].BLOCK_CSS_PATH = cssPath(ELEMENTS.NOW_MATCHES.BET_ITEMS[item]);

            // парсинг атрибута data-id
            EXPORT_BET_ITEMS[item].DATA_ID = ELEMENTS.NOW_MATCHES.BET_ITEMS[item].attributes[1].value;

            // парсинг ссылки на картинку турнира
            // если у турнира есть картинка
            if (ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[0].children[0].children[0].children[0]) {
                EXPORT_BET_ITEMS[item].TOURNAMENT_LOGO = ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[0].children[0].children[0].children[0].src;
            } else { // если у турнира нет картинки
                EXPORT_BET_ITEMS[item].TOURNAMENT_LOGO = ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[0].children[0].children[0].src;
            }

            // парсинг названия и лого команд
            EXPORT_BET_ITEMS[item].TEAM_A.NAME = ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[3].children[0].children[1].lastChild.nodeValue;
            EXPORT_BET_ITEMS[item].TEAM_A.LOGO = ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[3].children[0].children[2].children[0].src;

            EXPORT_BET_ITEMS[item].TEAM_B.NAME = ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[3].children[2].children[1].firstChild.nodeValue;
            EXPORT_BET_ITEMS[item].TEAM_B.LOGO = ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[3].children[2].children[2].children[0].src;

            if (ELEMENTS.NOW_MATCHES.BET_ITEMS[item].classList.contains('bet-live')) {
                EXPORT_BET_ITEMS[item].STATUS = 'live'
            }

            EXPORT_BET_ITEMS[item].TEAM_A.BET_BUTTON_CSS_PATH = cssPath(ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[3].children[1].children[0]);
            EXPORT_BET_ITEMS[item].TEAM_B.BET_BUTTON_CSS_PATH = cssPath(ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[3].children[1].children[2]);

            EXPORT_BET_ITEMS[item].MATCH_CONTROLS.STREAM_CSS_PATH = cssPath(ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[4].children[0]);
            EXPORT_BET_ITEMS[item].MATCH_CONTROLS.GRAPH_CSS_PATH = cssPath(ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[4].children[1]);
            EXPORT_BET_ITEMS[item].MATCH_CONTROLS.ADDITIONAL_EVENTS_CSS_PATH = cssPath(ELEMENTS.NOW_MATCHES.BET_ITEMS[item].children[0].children[0].children[4].children[2]);
        }

    } catch (e) {
        console.log(e)
    }
};

export const changeDetector = (oldValue) => {


    let newValue = nowLiveMatchesArray()
    return oldValue !== newValue.NOW_MATCHES.BET_ITEMS.length;
};

export const exportNowBetItems = () => {

    fullFillExportedArray(nullFillExportedArray(nowLiveMatchesArray()));

    return EXPORT_BET_ITEMS
};




