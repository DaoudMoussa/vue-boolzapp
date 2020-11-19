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

                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent',

                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received',

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

                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received',

                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare laspesa.',
                        status: 'received',

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

                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent',

                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received',

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

                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ci sono.',
                        status: 'received',

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

                    }
                ],
            },
        ],
        newMessage: '',
        notificationClosed: '',
        isHidden: '',
        contactFilter: '',
        dropdownIndex: undefined
    },
    methods: {
        openChat(contact) {
            this.activeChat = contact;

            this.contacts.forEach((contact) => {
                contact.visible = true;
            });

            this.contactFilter = '';
            this.dropdownIndex = undefined;

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
                status: 'sent'
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
        dropMenu(index) {
            // message.dropdownStatus == 'hidden' ? message.dropdownStatus = 'visible' : message.dropdownStatus = 'hidden';
            if(this.dropdownIndex != index) {
                this.dropdownIndex = index;
            } else {
                this.dropdownIndex = undefined;
            }
            scrollBarBottom();
        },
        deleteMessage(indexMessage) {
            // this.activeChat.messages.splice(indexMessage, 1);
            Vue.delete(this.activeChat.messages, indexMessage)
            this.dropdownIndex = undefined;

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
