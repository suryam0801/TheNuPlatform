import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Local Imports
import { RootState } from "../../Store";
import useChatsHook from "../../FirebaseCalls/useChatListener";
import { useParams } from "react-router-dom";
import { Message } from "../Message/Message";

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
    <div id="chat" className="main">
      {messages.map((message) => (
        <Message chatMessage={message} influencerId={id ?? ""} />
      ))}
    </div>
  );
};
