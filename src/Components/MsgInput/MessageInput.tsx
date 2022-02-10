import React, { useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// Local Imports
import styles from "./styles.module.scss";
import { writeChat } from "../../FirebaseCalls/FirebaseCalls";
import { ChatMessage } from "../../Models/ChatMessage";
import { auth } from "../../firebase";

export const MsgInput: React.FC = () => {
  const [msg, setMsg] = useState("");

  const getDateString = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, "0");
    let output = month + " " + day + ",";

    return `${output} - ${new Date().getHours()}:${new Date().getMinutes()}`;
  };

  const sendHandler = () => {
    writeChat({
      Message: msg,
      InfluencerId: "",
      SentBy: auth.currentUser ? auth.currentUser!.uid : "",
      Date: new Date(),
    } as ChatMessage);
    setMsg("");
  };

  return (
    <div
      className={styles.container}
      // onClick={props.onClick}
    >
      <InputBase
        className={styles.input}
        placeholder="Write here..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendHandler();
          }
        }}
      />
      <IconButton className={styles.iconButton} onClick={sendHandler}>
        <SendIcon className={styles.send} />
      </IconButton>
    </div>
  );
};
