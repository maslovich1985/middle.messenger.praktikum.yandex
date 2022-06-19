import Block from '../../common/Block';
import '../../pages/messages/messages.less';

export interface IMessageProps {
  isMyMessage: boolean;
  messageText: string;
  messageDate?: string;
  messageTime?: string;
}

export class Message extends Block<IMessageProps> {
  constructor({ isMyMessage, messageText }: IMessageProps) {
    super({
      isMyMessage,
      messageText,
    });
  }

  render() {
    // language=hbs
    return this.props.isMyMessage
      ? '<div class="messages-container__output-message">{{messageText}}</div>'
      : '<div class="messages-container__input-message">{{messageText}}</div>';
  }
}
