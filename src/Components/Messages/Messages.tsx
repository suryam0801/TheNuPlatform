import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// Local Imports
import styles from "./styles.module.scss";
import { ChatMessage } from "../../Models/ChatMessage";
import { RootState } from "../../Store";
import useChatsHook from "../../FirebaseCalls/useChatListener";
import { ReplyTo } from "../../Models/Reply";
import { writeChat } from "../../FirebaseCalls/FirebaseCalls";
import "./messages.css";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase";

type PropsMessage = {
  chatMessage: ChatMessage;
  influencerId: string;
};

const Message: React.FC<PropsMessage> = (props) => {
  function makeReplyToMessage() {
    var replyMessage = window.prompt("Reply To: " + props.chatMessage.Message);

    if (replyMessage) {
      var message = {
        Message: replyMessage,
        InfluencerId: "",
        SentBy: "",
        Date: new Date(),
      } as ChatMessage;

      var reply = {
        Message: props.chatMessage.Message,
        MessageId: props.chatMessage._id,
      } as ReplyTo;

      message.ReplyTo = reply;

      writeChat(message);
    }
  }

  function getMessageAlignment () {
    if (auth.currentUser) {
      if (props.chatMessage.SentBy === auth.currentUser?.uid) {
        return "sent"
      } else {
        return "received"
      }
    } else {
      if (props.chatMessage.SentBy === props.influencerId) {
        return "received"
      } else {
        return "sent"
      }
    }
  }

  return (
    <div>
      <div
        key={props.chatMessage.SentBy}
        className={`msg ${getMessageAlignment()}`}
      >
        {/* <img src={photoURL} alt="" /> */}
        <Row>
          {props.chatMessage.ReplyTo && (
            <Row>
              <div className="reply">
                <sub>Replying to:</sub>
                <h5 style={{ paddingBottom: 10 }}>
                  {props.chatMessage.ReplyTo.Message}
                </h5>
              </div>
            </Row>
          )}
          <p>{props.chatMessage.Message}</p>
        </Row>
      </div>
    </div>
  );
};

export const Messages: React.FC = () => {
  const messages = useSelector((state: RootState) => state.chatsState.messages);
  useChatsHook();

  const {id} = useParams();

  useEffect(() => {
    const chatElement = document.getElementById("chat");
    if (chatElement) {
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  });

  return (
    <div id="chat" className={styles.container}>
      <div className={styles.wrapper}>
        <div className="msgs">
          {messages.map((message) => (
            <Message chatMessage={message} influencerId={id ?? ""}/>
          ))}
        </div>
      </div>
    </div>
  );
};
