import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

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
import { getReadableDateAndTimeString } from "../../Utils/GeneralUtils";

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
        InfluencerId: props.chatMessage.InfluencerId,
        SentBy: auth.currentUser?.uid ?? "",
        Date: new Date().valueOf(),
      } as ChatMessage;

      var reply = {
        Message: props.chatMessage.Message,
        MessageId: props.chatMessage._id,
      } as ReplyTo;

      message.ReplyTo = reply;

      writeChat(message);
    }
  }

  function getMessageAlignment() {
    if (auth.currentUser) {
      if (props.chatMessage.SentBy === auth.currentUser?.uid) {
        return "sent";
      } else {
        return "received";
      }
    } else {
      if (props.chatMessage.SentBy === props.influencerId) {
        return "received";
      } else {
        return "sent";
      }
    }
  }

  function getReplyColor() {
    if (auth.currentUser) {
      if (props.chatMessage.SentBy === auth.currentUser?.uid) {
        return "replyBlue";
      } else {
        return "reply";
      }
    } else {
      if (props.chatMessage.SentBy === props.influencerId) {
        return "reply";
      } else {
        return "replyBlue";
      }
    }
  }

  return (
    <div>
      <div
        key={props.chatMessage.SentBy}
        className={`msg ${getMessageAlignment()}`}
        onClick={makeReplyToMessage}
      >
        {/* <img src={photoURL} alt="" /> */}
        <Row>
          {props.chatMessage.ReplyTo && (
            <Row>
              <div className={getReplyColor()}>
                <sub>Replying to:</sub>
                <h5 style={{ paddingBottom: 10 }}>
                  {props.chatMessage.ReplyTo.Message}
                </h5>
              </div>
            </Row>
          )}
          <p>{props.chatMessage.Message}</p>
          <sub style={{fontSize: 10, marginBottom: 10}}>{getReadableDateAndTimeString(props.chatMessage.Date)}</sub>
        </Row>
      </div>
    </div>
  );
};

export const Messages: React.FC = () => {
  const categories = useSelector(
    (state: RootState) => state.selectedCategoryReducer
  );

  const showMessages = createSelector(
    (state: RootState) => state.chatsState.messages,
    (messages) =>
      messages.filter(
        (message) =>
          message.Category ===
            categories.categories[categories.category]["categorizedName"] ||
          categories.categories[categories.category]["categorizedName"] ===
            "All"
      )
  );

  const messages = useSelector(showMessages);

  useChatsHook();

  const { id } = useParams();

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
            <Message chatMessage={message} influencerId={id ?? ""} />
          ))}
        </div>
      </div>
    </div>
  );
};
