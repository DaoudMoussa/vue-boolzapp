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
                name: 'Donato',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai commit',
                        status: 'received',
                        dropdownStatus: 'hidden'
                    }
                ],
            },
            {
                name: 'Francesco',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Stasera partita?',
                        status: 'sent',
                        dropdownStatus: 'hidden'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ci sono.',
                        status: 'received',
                        dropdownStatus: 'hidden'
                    }
                ],
            },
            {
                name: 'Maria',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Heyy',
                        status: 'sent',
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

            this.contacts.forEach((contact) => {
                contact.visible = true;
            });

            this.contactFilter = '';
        },
        shiftContact() {
            const index = this.contacts.indexOf(this.activeChat);
            this.contacts.splice(0, 0, this.activeChat);
            this.contacts.splice(index + 1, 1);
        },
        sendMessage() {
            const myDate = getDate();

            const newObjectMessage = {
                date: myDate,
                message: this.newMessage,
                status: 'sent',
                dropdownStatus: 'hidden'
            }

            this.shiftContact();
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
            scrollBarBottom();
        },
        deleteMessage(indexMessage) {
            // this.activeChat.messages.splice(indexMessage, 1);
            Vue.delete(this.activeChat.messages, indexMessage)
        },
        getLastmessageHour(contact) {
            const messageArray = contact.messages;
            const lastMessage = messageArray[messageArray.length - 1];
            const lastMessageDate = lastMessage.date;
            return this.getHourAndMinute(lastMessageDate);
        },
        getHourAndMinute(myDate) {
            const myNewFormatDate = dayjs(myDate, "DD/MM/YYYY HH:mm:ss");
            return myNewFormatDate.format('HH:mm');
        },
        applyFilter() {
            this.contacts.forEach((contact) => {
                let filter = this.contactFilter.toLowerCase()
                let nameContact = contact.name.toLowerCase();
                if(nameContact.includes(filter)) {
                    contact.visible = true;
                } else {
                    contact.visible = false;
                }
            })
        }

    },
    created() {
        this.activeChat = this.contacts[0];
    }
});

function scrollBarBottom() {
    setTimeout(function() {
        let chat = document.getElementById('chat');

        chat.scrollTop = chat.scrollHeight - chat.clientHeight;

    }, 100);
}
function getDate() {
    return dayjs().format("DD/MM/YYYY HH:mm:ss");
}
