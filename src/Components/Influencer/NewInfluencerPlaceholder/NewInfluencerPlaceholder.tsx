import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { RootState } from "../../../Store";

export default function NewInfluencerPlaceholder() {
  const influencer = useSelector((state: RootState) => state.influencerReducer.influencer);

  return (
    <div className="main">
      <Divider style={{ backgroundColor: "white" }}></Divider>
      <h1 style={{ color: "white", marginTop: 10, marginBottom: 10 }}>
        N U E P L A T F O R M
      </h1>
      <Divider style={{ backgroundColor: "white" }}></Divider>

      <h1 style={{ color: "white", marginTop: 15 }}>
        Welcome {influencer?.Username}
      </h1>

      {auth.currentUser ? (
        <>
          <p>1) Connect with all your fans in this group chat</p>

          <p>
            2) We help categorize the messages so you can focus on the
            meaningful ones!
          </p>

          <p style={{ fontSize: 20, marginTop: 80 }}>
            To get started, share this link with all your fans!
          </p>
        </>
      ) : (
        <>
          <p>1) Connect anonymously with your favorite influencerss!</p>

          <p style={{ fontSize: 20, marginTop: 40 }}>
            To get started, begin chatting!
          </p>
        </>
      )}
    </div>
  );
}
