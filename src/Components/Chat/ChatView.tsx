import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { GetUser } from "../../Redux/Actions/UserActions";
import { Messages } from "../Messages/Messages";
import { MsgInput } from "../MsgInput/MessageInput";
import "../../App.css";
import { Col, Row } from "react-bootstrap";
import CommonHeader from "../Auth/CommonHeader/CommonHeader";

export default function ChatView() {
  // Render
  return (
    <div className="App">
      <header>
        <CommonHeader></CommonHeader>
        <h5 style={{ color: "white", letterSpacing: 2, marginTop: 4 }}>
          Connect With Your Favorite Influencers
        </h5>
      </header>
      <section>
        <Messages></Messages>
        <MsgInput></MsgInput>
      </section>
    </div>
  );
}
