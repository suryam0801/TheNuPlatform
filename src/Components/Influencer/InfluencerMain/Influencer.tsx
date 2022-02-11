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
    <div className="App">
      <header>
        {/* <h1>NuePlatform</h1> */}
        <ChipsArray></ChipsArray>
      </header>
      <section>
        <Messages></Messages>
        <MsgInput></MsgInput>
      </section>
    </div>
  );
};

export default Influencer;
