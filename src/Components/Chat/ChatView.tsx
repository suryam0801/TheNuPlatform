import { useSelector } from "react-redux";
import { Messages } from "../Messages/Messages";
import { MsgInput } from "../MsgInput/MessageInput";
import "../../App.css";
import CommonHeader from "../Auth/CommonHeader/CommonHeader";
import { RootState } from "../../Store";
import useGetInfluencer from "../../CustomHooks/useGetInfluencer";
import IdentitySeparationRow from "../IdentityRowSeperator/IdentitySeparationRow";

export default function ChatView() {
  // Render

  useGetInfluencer();

  const influencer = useSelector((state: RootState) => state.influencerReducer.influencer)

  return (
    <div className="App">
      <header>
        <CommonHeader></CommonHeader>
        <IdentitySeparationRow></IdentitySeparationRow>
        {/* <h5 style={{ color: "white", letterSpacing: 2, marginTop: 4 }}>
          Connect With {influencer?.Username ?? " Your Favorite Influencers"}
        </h5> */}
      </header>
      <section>
        <Messages></Messages>
        <MsgInput></MsgInput>
      </section>
    </div>
  );
}
