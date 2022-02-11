import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { GetUser } from "../../../Redux/Actions/UserActions";
import { Messages } from "../../Messages/Messages";
import { MsgInput } from "../../MsgInput/MessageInput";

// Local Imports
import ChipsArray from "../ChipsArray/ChipsArray";
import styles from "../../Chat/styles.module.scss";
import { useWindowSize } from "react-use";

const Influencer: React.FC = () => {
  const dispatch = useDispatch();

  const { width, height } = useWindowSize();

  useEffect(() => {
    dispatch(GetUser(auth.currentUser!.uid));
  }, []);

  // Render
  return (
    <div style={{maxWidth: width, maxHeight: height}}>
      <div className={styles.container}>
        <div className={styles.main}>
          <ChipsArray></ChipsArray>
          <Messages></Messages>
          <MsgInput></MsgInput>
        </div>
      </div>
    </div>
  );
};

export default Influencer;
