import { Messages } from "../Messages/Messages";
import { MsgInput } from "../MsgInput/MessageInput";
import styles from "./styles.module.scss"

export default function ChatView() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Messages></Messages>
        <MsgInput></MsgInput>
      </div>
    </div>
  );
}
