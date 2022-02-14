import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { GetUser } from "../../../Redux/Actions/UserActions";
import { RootState } from "../../../Store";
import LogoutAndShareBar from "../../LogoutAndShareBar/LogoutAndShareBar";
import { Messages } from "../../Messages/Messages";
import { MsgInput } from "../../MsgInput/MessageInput";

// Local Imports
import ChipsArray from "../ChipsArray/ChipsArray";
import NewInfluencerPlaceholder from "../NewInfluencerPlaceholder/NewInfluencerPlaceholder";

const Influencer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUser(auth.currentUser!.uid));
  }, []);

  // Render
  return (
    <div className="App">
      <header>
        {/* <h1>NuePlatform</h1> */}
        <ChipsArray></ChipsArray>
        <LogoutAndShareBar></LogoutAndShareBar>
      </header>
      <section>
        <Messages></Messages>
        <MsgInput></MsgInput>
      </section>
    </div>
  );
};

export default Influencer;
