const app = new Vue({
    el: '#root',
    data: {
        activeChat: {}, // Created gli passa il riferimento dell'oggetto del primo contatto
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent',
                        dropdownStatus: 'hidden'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                        dropdownStatus: 'hidden'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received',
                        dropdownStatus: 'hidden'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent',
                        dropdownStatus: 'hidden'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received',
                        dropdownStatus: 'hidden'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare laspesa.',
                        status: 'received',
                        dropdownStatus: 'hidden'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received',
                        dropdownStatus: 'hidden'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent',
                        dropdownStatus: 'hidden'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received',
                        dropdownStatus: 'hidden'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent',
                        dropdownStatus: 'hidden'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received',
                        dropdownStatus: 'hidden'
                    }
                ],
            },
        ],
        newMessage: '',
        notificationClosed: '',
        isHidden: '',
        contactFilter: ''
    },
    methods: {
        openChat(contact) {
            this.activeChat = contact;
        },
        sendMessage() {
            const myDate = getDate();

            const newObjectMessage = {
                date: myDate,
                message: this.newMessage,
                status: 'sent',
                dropdownStatus: 'hidden'

            }

            scrollBarBottom();


            this.activeChat.messages.push(newObjectMessage);
            setTimeout(() => {
                const theirDate = getDate();
                const newAnswerMessage = {
                    date: theirDate,
                    message: 'ok',
                    status: 'received',
                    dropdownStatus: 'hidden'
                }
                this.activeChat.messages.push(newAnswerMessage);
                scrollBarBottom();
            }, 1000);

            this.newMessage = '';
        },
        closeNotification() {
            this.notificationClosed = 'taller';
            this.isHidden = 'hidden';
        },
        dropMenu(message) {
            message.dropdownStatus == 'hidden' ? message.dropdownStatus = 'visible' : message.dropdownStatus = 'hidden';
        },
        deleteMessage(indexMessage) {
            this.activeChat.messages.splice(indexMessage, 1);
        }

    },
    created() {
        this.activeChat = this.contacts[0];
    }
});

function scrollBarBottom() {
    setTimeout(function() {
        let chat = document.getElementById('chat');
        console.log(chat.scrollTop);

        chat.scrollTop = chat.scrollHeight - chat.clientHeight;
        console.log(chat.scrollTop);

    }, 100);
}
function getDate() {
    const date = new Date();
    const month = date.getMonth() + 1
    const year = date.getFullYear();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}
