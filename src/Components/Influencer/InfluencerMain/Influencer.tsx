import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { GetUser } from "../../../Redux/Actions/UserActions";
import { Messages } from "../../Messages/Messages";
import { MsgInput } from "../../MsgInput/MessageInput";

// Local Imports
import ChipsArray from "../ChipsArray/ChipsArray";
import IdentitySeparationRow from "../IdentitySeparationRow/IdentitySeparationRow";

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
        <IdentitySeparationRow></IdentitySeparationRow>
      </header>
      <section>
        <Messages></Messages>
        <MsgInput></MsgInput>
      </section>
    </div>
  );
};

export default Influencer;
