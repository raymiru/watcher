export const host = {
    dev: 'http://localhost:4000',
    prod: 'http://35.246.13.97'
};

export const setHost = () => {
    if (localStorage['host'] === 'dev') {
        return host.dev
    } else {
        return host.prod
    }
};
