import { withStore } from '../../common/Store';
// eslint-disable-next-line import/no-cycle
import { MessagesPage } from './messages';

const withChats = withStore((state) => ({
  chatList: state.chatList,
  currentChatId: state.currentChatId,
  messageList: state.messageList || [],
}));

export default withChats(MessagesPage);
