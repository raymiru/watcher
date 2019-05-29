export const checkSteamLogin = () => {
    let steamLoginButton = null;


    if (document.querySelector('body > div.layout > div.layout__header > header > div.header__outer > div > div.header__body > div.header__userbar > div > div > div.userbar-user__user-switcher > div')) {
        console.log('STEAM LOGGED');
        localStorage['steamLogged'] = 'true'
    } else {
        console.log('STEAM LOG IN PROGRESS');
        localStorage['steamLogged'] = 'false';
        steamLoginButton = document.querySelector('body > div.layout > div.layout__header > header > div.header__outer > div > div.header__body > div.header__userbar > div > div.userbar__userbar-login > a');
        steamLoginButton.click();

    }
};


export const steamLogin = () => {
    let signInButton = null;

    try {
        setTimeout(() => {

            signInButton = document.querySelector('#imageLogin');
            document.querySelector('#steamPassword').click();



        }, 1500)
    } catch (e) {
        console.log(e)
    }

    try {

        setTimeout( () => {
            console.log(signInButton)
            signInButton.click();
        }, 3000)
    } catch (e) {
        console.log(e)
    }
}


