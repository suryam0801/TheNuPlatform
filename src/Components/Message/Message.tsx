import React from "react";
// Local Imports
import { ChatMessage } from "../../Models/ChatMessage";
import { ReplyTo } from "../../Models/Reply";
import { writeChat } from "../../FirebaseCalls/FirebaseCalls";
import { Row } from "react-bootstrap";
import { auth } from "../../firebase";

type PropsMessage = {
  chatMessage: ChatMessage;
  influencerId: string;
};

export const Message: React.FC<PropsMessage> = (props) => {
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
    <>
      <div
        className={`message ${getMessageAlignment()}`}
        onClick={makeReplyToMessage}
      >
        <div>
          {props.chatMessage.ReplyTo && (
            <div className={getReplyColor()}>
              <h5>{props.chatMessage.ReplyTo.Message}</h5>
            </div>
          )}
          <p>{props.chatMessage.Message}</p>
        </div>
      </div>
    </>
  );
};
