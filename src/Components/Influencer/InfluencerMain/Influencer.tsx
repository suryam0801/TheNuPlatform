import React from "react";
import { useSelector } from "react-redux";
import useGetInfluencer from "../../../CustomHooks/useGetInfluencer";
import { RootState } from "../../../Store";
import LogoutAndShareBar from "../../LogoutAndShareBar/LogoutAndShareBar";
import { Messages } from "../../Messages/Messages";
import { MsgInput } from "../../MsgInput/MessageInput";
import ProfileCreate from "../../ProfileCreate/ProfileCreate";

// Local Imports
import ChipsArray from "../ChipsArray/ChipsArray";
import NewInfluencerPlaceholder from "../NewInfluencerPlaceholder/NewInfluencerPlaceholder";

const Influencer: React.FC = () => {
  
  useGetInfluencer();

  const userExists = useSelector(
    (state: RootState) => state.loginReducer.userExists
  );

  // Render
  return (
    <div className="App">
      {userExists ? (
        <>
          <header>
            <ChipsArray></ChipsArray>
            <LogoutAndShareBar></LogoutAndShareBar>
          </header>
          <section>
            <Messages></Messages>
            <MsgInput></MsgInput>
          </section>
        </>
      ) : (
        <div className="main">
          <ProfileCreate></ProfileCreate>
        </div>
      )}
    </div>
  );
};

export default Influencer;
