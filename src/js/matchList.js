const getElementsCount = type => {
    return document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).childElementCount
};

const getStatus = (type, index, currentLiveIndex) => {
    if (document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].classList.contains('bet-live')) {
        currentLiveIndex++;
        return {status: 'live', liveIndex: currentLiveIndex}
    }
    return {status: null, liveIndex: null}
};

const getTournamentLogo = (type, index) => {
    let tournamentLogo = null
    if (document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[0].children[0].children[0].children[0]) {
        tournamentLogo = document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[0].children[0].children[0].children[0].src
    } else tournamentLogo = document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[0].children[0].children[0].src


    return tournamentLogo
};

const getDataId = (type, index) => {
    return document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].getAttribute('data-id');
};

const leftLock = (type, index) => {
    return document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].classList.contains('bet-live-left-lock')
};


const rightLock = (type, index) => {
    return document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].classList.contains('bet-live-right-lock')
};

const getTeamName = (type, index, side) => {
    if (side === 'A') {
        return document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[3].children[0].children[1].lastChild.nodeValue.trim();
    } else if (side === 'B') {
        return document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[3].children[2].children[1].firstChild.nodeValue.trim();
    }
};

const getTeamLogo = (type, index, side) => {
    if (side === 'A') {
        return document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[3].children[0].children[2].children[0].src;
    } else if (side === 'B') {
        return document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[3].children[2].children[2].children[0].src;
    }
};


const getLiveDataIds = (type, index, dataId, statusString) => {
    let LIVE_DATA_IDS = [];
    let additionalEvents = document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[1].children[0].children[0];
    let subEvents = document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[1].children[0].children[1];
    if (statusString === 'LIVE на матч') {
        LIVE_DATA_IDS[0] = dataId
    } else if (
        statusString === 'LIVE на карту #1' ||
        statusString === 'LIVE на карту #2' ||
        statusString === 'LIVE на карту #3' ||
        statusString === 'LIVE на карту #4' ||
        statusString === 'LIVE на карту #5' ||
        statusString === 'LIVE на карту #6' ||
        statusString === 'LIVE на карту #7') {
        for (let i = 0; i < additionalEvents.childElementCount; i++) {
            LIVE_DATA_IDS.push(additionalEvents.children[i].children[0].getAttribute('data-id'))
        }

        for (let i = 0; i < subEvents.childElementCount; i++) {
            LIVE_DATA_IDS.push(subEvents.children[i].children[0].getAttribute('data-id'))
        }

    }

    return LIVE_DATA_IDS
};

const getStatusString = (type, index) => {
    return {
        statusString: document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[3].children[1].children[1].children[0].innerText.trim(),
        statusStringBuilder: document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[3].children[1].children[1].children[0].innerText.trim().replace(/[^LIVElive\d]/g, '')
    }
};


const getAdditionalEvents = (type, index) => {
    let addEventsArr = [];

    let additionalEvents = document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[1].children[0].children[0];
    let subEvents = null
    if (document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[1].children[0].children[1]) {
        subEvents = document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[1].children[0].children[1];
    }


    for (let i = 0; i < additionalEvents.childElementCount; i++) {
        addEventsArr.push({
            DATA_ID: additionalEvents.children[i].children[0].getAttribute('data-id'),
            eventName: additionalEvents.children[i].children[0].children[4].innerText.trim(),
        })
    }

    if (subEvents !== null) {
        for (let i = 0; i < 1; i++) {
            addEventsArr.push({
                DATA_ID: subEvents.children[i].children[0].getAttribute('data-id'),
                eventName: subEvents.children[i].children[0].children[4].innerText.trim(),
            })
        }
    }

    return addEventsArr
};


const getLeftOdds = (type, index) => {
    return document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[3].children[1].children[0].children[0].children[0].children[2].children[0].innerText.replace(/[^.\d]/g, '')
};

const getRightOdds = (type, index) => {
    return document.querySelector(`.${type} >:nth-child(2) >:nth-child(1)`).children[index].children[0].children[0].children[3].children[1].children[2].children[0].children[0].children[2].children[0].innerText.replace(/[^.\d]/g, '')
};

export const nowMatchList = () => {
    const nowType = 'timerange_now';
    let exportNowMatchList = [];


    let elementsCount = getElementsCount(nowType);


    if (document.querySelector('.timerange_now >:nth-child(2)').innerText !== 'Нет активных матчей') {
        let currentLiveIndex = -1;
        for (let i = 0; i < elementsCount; i++) {
            let STATUS = getStatus(nowType, i, currentLiveIndex);
            exportNowMatchList.push({
                DATA_ID: getDataId(nowType, i),
                STATUS: STATUS.status,
                LIVE_INDEX: STATUS.liveIndex,
                STATUS_STRING: getStatusString(nowType, i).statusString,
                STATUS_BUILDER: getStatusString(nowType, i).statusStringBuilder,
                LIVE_DATA_IDS: getLiveDataIds(nowType, i, getDataId(nowType, i), getStatusString(nowType, i).statusString),
                TOURNAMENT_LOGO: getTournamentLogo(nowType, i),
                TEAM_A: {
                    LOCK: leftLock(nowType, i),
                    NAME: getTeamName(nowType, i, 'A'),
                    LOGO: getTeamLogo(nowType, i, 'A')
                },
                TEAM_B: {
                    LOCK: rightLock(nowType, i),
                    NAME: getTeamName(nowType, i, 'B'),
                    LOGO: getTeamLogo(nowType, i, 'B')
                }
            })
        }
    }

    return exportNowMatchList
};


export const nextMatchList = () => {


    const nextType = 'timerange_next';
    let exportNextMatchList = [];

    let elementsCount = getElementsCount(nextType);

    for (let i = 0; i < elementsCount; i++) {
        exportNextMatchList.push({
            DATA_ID: getDataId(nextType, i),
            STATUS_STRING: getStatusString(nextType, i).statusString,
            ADDITIONAL_EVENTS: getAdditionalEvents(nextType, i),
            TOURNAMENT_LOGO: getTournamentLogo(nextType, i),
            TEAM_A: {
                ODDS: getLeftOdds(nextType, i),
                NAME: getTeamName(nextType, i, 'A'),
                LOGO: getTeamLogo(nextType, i, 'A')
            },
            TEAM_B: {
                ODDS: getRightOdds(nextType, i),
                NAME: getTeamName(nextType, i, 'B'),
                LOGO: getTeamLogo(nextType, i, 'B')
            }
        })
    }


    return exportNextMatchList
};
