import Chance from 'chance'

const chance = new Chance();


export const calcDelay = () => {
    const delayArray = [];

    for (let i = 0; i < 1; i++) {
        delayArray.push(chance.integer({min: 250, max: 3000}))
    }

    return delayArray[0]
};

