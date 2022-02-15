import React, { useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// Local Imports
import { writeChat } from "../../FirebaseCalls/FirebaseCalls";
import { ChatMessage } from "../../Models/ChatMessage";
import { auth } from "../../firebase";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

export const MsgInput: React.FC = () => {
  const [msg, setMsg] = useState("");

  const influencer = useSelector((state: RootState) => state.influencerReducer.influencer)

  const sendHandler = () => {
    if (msg) {
      writeChat({
        Message: msg,
        InfluencerId: influencer?.UserId,
        SentBy: auth.currentUser ? auth.currentUser!.uid : "",
        Date: new Date().valueOf(),
      } as ChatMessage);
      setMsg("");
    }
  };

  return (
    <form>
      <InputBase
        fullWidth
        placeholder="Write here.. (everything is anonymous)"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        multiline={true}
        maxRows={2}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendHandler();
          }
        }}
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 15,
          margin: 5,
          fontSize: 16,
        }}
      />

      <div
        style={{
          backgroundColor: "black",
          borderRadius: 10,
          padding: 5,
          margin: 5,
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={sendHandler}
          style={{ color: "white", width: 35, height: 35 }}
        >
          <SendIcon />
        </IconButton>
      </div>
    </form>
  );
};
