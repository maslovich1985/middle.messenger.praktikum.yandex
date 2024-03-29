import Block from '../../common/Block';
import './messages.less';
import { scrollToLastMessage, validateInputs } from '../../common/utils';
import { REGEXP_MESSAGE } from '../../common/const';
import { IMessageProps } from '../../components/Message/message';
import { IChatData, store } from '../../common/Store';
import AuthController from '../../controllers/AuthController';
import Router from '../../common/Router';
import ChatController from '../../controllers/ChatController';
// eslint-disable-next-line import/no-cycle
import { ws } from '../../index';

interface IChatListProps {
  chatList?: IChatData[];
  messageList?: IMessageProps[];
}

export class MessagesPage extends Block {
  constructor(props: IChatListProps) {
    super({
      ...props,
      onClick: (event: Event) => {
        if ((event.target as HTMLButtonElement).id === 'button-send-message') {
          this.onSendMessage();
        } else {
          this.onLogout();
        }
      },
      onCreateChat: () => this.createChat(),
      onDeleteChat: () => this.deleteChat(),
      onAddUser: () => this.addUserToChat(),
      onDeleteUser: () => this.removeUserFromChat(),
      getProfileInfo: () => this.getProfileInfo(),
    });
  }

  componentDidMount() {
    const router = new Router();
    ChatController.getChats().then(() => {
      AuthController.fetchUser(); // Подтягиваем информацию о юзере (нам нужен userID для работы с websocket);
    }).catch(() => {
      router.go('/signin');
    });
  }

  addUserToChat() {
    // eslint-disable-next-line no-alert
    const userId = prompt('Введите ID пользователя для добавления в текущий чат');
    if (userId) {
      ChatController.addUserToChat(store.getState().currentChatId, +userId)
      // eslint-disable-next-line no-alert
        .then(() => alert('Пользователь успешно добавлен!'))
      // eslint-disable-next-line no-alert
        .catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
    } else {
      // eslint-disable-next-line no-alert
      alert('Поле не должно быть пустым!');
    }
  }

  removeUserFromChat() {
    // eslint-disable-next-line no-alert
    const userId = prompt('Введите ID пользователя для удаления из текущего чата');
    if (userId) {
      ChatController.removeUserFromChat(store.getState().currentChatId, +userId)
      // eslint-disable-next-line no-alert
        .then(() => alert('Пользователь успешно удалён!'))
      // eslint-disable-next-line no-alert
        .catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
    } else {
      // eslint-disable-next-line no-alert
      alert('Поле не должно быть пустым!');
    }
  }

  createChat() {
    // eslint-disable-next-line no-alert
    const chatTitle = prompt('Введите название чата');
    if (chatTitle) {
      ChatController.createChat(chatTitle)
        .then(() => ChatController.getChats())
      // eslint-disable-next-line no-alert
        .catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
    } else {
      // eslint-disable-next-line no-alert
      alert('Название чата не должно быть пустым!');
    }
  }

  deleteChat() {
    // eslint-disable-next-line no-alert
    const result = window.confirm('Вы действительно хотите удалить этот чат?');

    if (result) {
      ChatController.deleteChat(store.getState().currentChatId)
        .then(() => {
          store.set('messageList', []);
          ChatController.getChats();
        })
      // eslint-disable-next-line no-alert
        .catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
    }
  }

  getProfileInfo() {
    // eslint-disable-next-line no-alert
    AuthController.fetchUser().catch((error) => alert(`Ошибка запроса данных пользователя! ${error ? error.reason : ''}`));
  }

  onSendMessage() {
    const data = validateInputs({ elementId: 'message', regexp: REGEXP_MESSAGE }) as { message: string } | undefined;
    if (data) {
      ws.sendMessage(data.message);
      scrollToLastMessage();
    }
  }

  onLogout() {
    AuthController.logout().then(() => {
      store.clearUserInfo(); // Заметаем следы ;)
      const router = new Router();
      router.go('/signin');
      // eslint-disable-next-line no-alert
    }).catch((error) => alert(`Ошибка выполнения запроса /logout! ${error ? error.reason : ''}`));
  }

  messageListToJSX() {
    const messageList = this.props.messageList as unknown as IMessageProps[];
    if (!messageList) {
      return '';
    }

    return messageList.map((message: IMessageProps) => `{{{ Message isMyMessage=${message.isMyMessage} messageText="${message.messageText}" }}}`).join('');
  }

  chatListToJSX() {
    const { chatList } = store.getState();
    if (!chatList) {
      return '';
    }

    return chatList
      .map((chat: IChatData) => {
        const avatar = chat.avatar === null ? '"https://help.alueducation.com/system/photos/360113168439/images.png"' : `"${chat.avatar}"`;
        const lastMessage = !chat.last_message?.content ? undefined : `"${chat.last_message?.content}"`;
        const unreadMessagesCount = !chat.unread_count ? undefined : `"${chat.unread_count}"`;

        let lastMessageTime;
        if (chat.last_message?.time) {
          lastMessageTime = `"${new Date(chat.last_message?.time).toLocaleTimeString()}"`;
        }

        return `
          {{{ Chat
          id="${chat.id}"
          title="${chat.title}"
          message=${lastMessage}
          time=${lastMessageTime}
          unreadMessages=${unreadMessagesCount}
          avatar=${avatar}
          }}}
        `;
      })
      .join('');
  }

  getChatTitle() {
    const chatId = store.getState()?.currentChatId;
    if (chatId) {
      const chat = store.getState()?.chatList.filter((item: IChatData) => String(item.id) === chatId);

      if (chat && chat.length > 0) {
        return chat[0].title;
      }
    }

    return undefined;
  }

  render() {
    const currentChatTitle = this.getChatTitle();

    // language=hbs
    return `
        <div class="messages-page-container">
            <div class="block-left">
                <div class="link-container">
                    <div class="button-chat-container">
                        {{{ Button buttonId="button-create-chat" label="Создать чат" onClick=onCreateChat }}}
                        
                        ${currentChatTitle ? `
                          {{{ Button buttonId="button-add-user" label="Пригласить" onClick=onAddUser }}}
                          {{{ Button buttonId="button-delete-user" label="Исключить" onClick=onDeleteUser }}}
                        ` : ''}
                    </div>
                    {{{ Link to="/profile" text="Профиль ❯" }}}
                </div>
                <div class="search-block">
                    <input type="search" placeholder="Поиск" class="form-input input-normal" />
                </div>
                <div class="chat-list">
                    ${this.chatListToJSX()}
                </div>
            </div>
            <div class="block-right">
                <div class="profile-info">
                    <div class="profile-logo">
                        ${currentChatTitle ? `
                            <img class="profile-logo__img" src="https://help.alueducation.com/system/photos/360113168439/images.png"
                                 height="34px" width="34px" alt="logo {{title}}" />  
                            ` : ''}
                    </div>
                    <div class="profile-info__chat-name">
                        ${currentChatTitle || '↙ Выберите чат из списка'}
                        ${currentChatTitle ? '{{{ Button buttonId="button-delete-chat" label="Удалить" onClick=onDeleteChat }}}' : ''}
                    </div>
                    <div class="profile-info__settings-icon">
                        {{{ Button buttonId="button-logout" label="Выход" onClick=onClick }}}
                    </div>
                </div>
                <div class="messages-container">
                    ${this.messageListToJSX()}
                </div>
                <form class="send-message-block" onSubmit="return false;">
                    {{{ Input inputId="message" inputPlaceholder="Сообщение" inputType="text" inputName="message" regexp="^.*\\S.*$" }}}
                    <div class="button-container">
                        ${currentChatTitle ? '{{{ Button buttonId="button-send-message" label="Отправить" onClick=onClick }}}' : ''}
                    </div>
                </form>
            </div>
        </div>
    `;
  }
}
