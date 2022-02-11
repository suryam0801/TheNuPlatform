import React, { useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// Local Imports
import styles from "./styles.module.scss";
import { writeChat } from "../../FirebaseCalls/FirebaseCalls";
import { ChatMessage } from "../../Models/ChatMessage";
import { auth } from "../../firebase";
import { useParams } from "react-router-dom";

export const MsgInput: React.FC = () => {
  const [msg, setMsg] = useState("");

  const { id } = useParams();

  const sendHandler = () => {
    writeChat({
      Message: msg,
      InfluencerId: auth.currentUser?.uid ?? id,
      SentBy: auth.currentUser ? auth.currentUser!.uid : "",
      Date: new Date().valueOf(),
    } as ChatMessage);
    setMsg("");
  };

  return (
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
  );
};
