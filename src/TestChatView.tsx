import "./App.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./Components/Auth/Context/AuthContext";
import Login from "./Components/Auth/Login/Login";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { RootState } from "./Store";
import { auth } from "./firebase";
import { InputBase, IconButton } from "@mui/material";
import { writeChat } from "./FirebaseCalls/FirebaseCalls";
import { ChatMessage } from "./Models/ChatMessage";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import useChatsHook from "./FirebaseCalls/useChatListener";
import { Message } from "./Components/Message/Message";
import { getRandomInt } from "./Utils/GeneralUtils";

export default function TestChatView() {
  const user = useContext(AuthContext);

  return (
    <div className="App">
      <header>
        <h1>NuePlatform</h1>
      </header>

      <section>{user ? <ChatRoom /> : <Login />}</section>
    </div>
  );
}

function ChatRoom() {
  const { id } = useParams();

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

  const [msg, setMsg] = useState("");

  const sendHandler = () => {
    writeChat({
      Message: msg,
      InfluencerId: auth.currentUser?.uid ?? id,
      SentBy: auth.currentUser ? auth.currentUser!.uid : "",
      Date: new Date().valueOf(),
    } as ChatMessage);
    setMsg("");
  };

  useEffect(() => {
    const chatElement = document.getElementById("chat");
    if (chatElement) {
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  });

  const influencerPicNumber = getRandomInt(0, 8);

  return (
    <>
      <div id="chat" className="main">
        {messages &&
          messages.map((msg) => (
            <Message
              influencerPicNumber={influencerPicNumber}
              influencerId={msg.InfluencerId}
              chatMessage={msg}
            />
          ))}
      </div>

      <form>
        <InputBase
          placeholder="Write here.. (everything is anonymous)"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendHandler();
            }
          }}
        />
        <IconButton onClick={sendHandler}>
          <SendIcon />
        </IconButton>
      </form>
    </>
  );
}
