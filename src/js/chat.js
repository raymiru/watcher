export const chatMsgArray = () => {

    try {
        let chatMsgCount = document.querySelector('.chat-messages').childElementCount;
        let onlineCount = document.querySelector('.chat-header-info__online').innerText.replace(/[^-.\d]/g, '')
        let msgArray = [];

        try {
            for (let i = chatMsgCount - 30; i < chatMsgCount; i++) {
                msgArray.push({
                    username: document.querySelector('.chat-messages').children[i].children[0].children[0].children[0].innerText,
                    text: document.querySelector('.chat-messages').children[i].children[0].children[0].children[1].innerText
                })
            }
        } catch (e) {
            console.log(e)
        }

        return {msgArray, onlineCount}
    } catch (e) {
        console.error(e)
    }
};
