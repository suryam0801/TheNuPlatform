import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { GetUser } from "../../Redux/Actions/UserActions";
import IdentitySeparationRow from "../Influencer/IdentitySeparationRow/IdentitySeparationRow";
import { Messages } from "../Messages/Messages";
import { MsgInput } from "../MsgInput/MessageInput";
import "../../App.css";
import { Col, Row } from "react-bootstrap";
import CommonHeader from "../Auth/CommonHeader/CommonHeader";

export default function ChatView() {
  const dispatch = useDispatch();

  // Render
  return (
    <div className="App">
      <header>
        <CommonHeader></CommonHeader>
        <IdentitySeparationRow></IdentitySeparationRow>
      </header>
      <section>
        <Messages></Messages>
        <MsgInput></MsgInput>
      </section>
    </div>
  );
}
