import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReplyIcon from '@mui/icons-material/Reply';

// Local Imports
import styles from './styles.module.scss';
import { ChatMessage } from '../../Models/ChatMessage';
import { RootState } from '../../Store';
import useChatsHook from '../../FirebaseCalls/useChatListener';
import { ReplyTo } from '../../Models/Reply';
import { writeChat } from '../../FirebaseCalls/FirebaseCalls';

type PropsMessage = {
  chatMessage: ChatMessage
};

const Message: React.FC<PropsMessage> = props => {

  function makeReplyToMessage() {
    var replyMessage = window.prompt("Reply To: " + props.chatMessage.Message)

    if (replyMessage) {
      var message = {
        Message: replyMessage,
        InfluencerId: "",
        SentBy: "",
        Date: new Date()
      } as ChatMessage

      var reply = {
        Message: props.chatMessage.Message,
        MessageId: props.chatMessage._id
      } as ReplyTo

      message.ReplyTo = reply;

      writeChat(message);
    }
  }

  return (
    <div className={styles.messageContainer}>
      {/* <img className={styles.image} alt="User" src={props.image} /> */}
      <div className={styles.textBox}>
        <p className={styles.username}>
          Anonymous
          {/* {props.username} */}
          <span className={styles.date}>{props.chatMessage.Date}</span>
        </p>
        <p className={styles.message}>{props.chatMessage.Message}</p>
        <div onClick={makeReplyToMessage}>
          <ReplyIcon></ReplyIcon>
        </div>
      </div>
    </div>
  );
};

export const Messages: React.FC = () => {

  const messages = useSelector((state: RootState) => state.chatsState.messages)
  useChatsHook();

  useEffect(() => {
    const chatElement = document.getElementById('chat');
    if (chatElement) {
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  });

  return (
    <div id="chat" className={styles.container}>
      <div className={styles.wrapper}>
        {messages.map(message => (
          <Message
            chatMessage={message}
          />
        ))}
      </div>
    </div>
  );
};