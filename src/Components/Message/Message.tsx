import React, { useEffect } from "react";
// Local Imports
import { ChatMessage } from "../../Models/ChatMessage";
import { ReplyTo } from "../../Models/Reply";
import { writeChat } from "../../FirebaseCalls/FirebaseCalls";
import { auth } from "../../firebase";

// RCE CSS
import "react-chat-elements/dist/main.css";
import { avatarUrls } from "../../Utils/AvatarUrl";
import { getRandomInt, randomExcluded } from "../../Utils/GeneralUtils";

type PropsMessage = {
  chatMessage: ChatMessage;
  influencerId: string;
  influencerPicNumber: number;
};

export const Message: React.FC<PropsMessage> = (props) => {
  function makeReplyToMessage() {
    if (auth.currentUser) {
      var replyMessage = window.prompt(
        "Reply To: " + props.chatMessage.Message
      );

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
  }

  function getMessageAlignment() {
    if (auth.currentUser && (auth.currentUser.uid === props.influencerId)) {
      if (props.chatMessage.SentBy === auth.currentUser.uid) {
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
    if (auth.currentUser && (auth.currentUser.uid === props.influencerId)) {
      if (props.chatMessage.SentBy === auth.currentUser.uid) {
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
        <img
          src={
            props.chatMessage.InfluencerId === props.chatMessage.SentBy
              ? avatarUrls[props.influencerPicNumber]
              : avatarUrls[randomExcluded(0, 8, props.influencerPicNumber)]
          }
        />
        <div>
          {props.chatMessage.ReplyTo && (
            <div className={getReplyColor()}>
              <h5 style={{ color: "white" }}>
                {props.chatMessage.ReplyTo.Message}
              </h5>
            </div>
          )}
          <p>{props.chatMessage.Message}</p>
        </div>
      </div>
    </>
  );
};
