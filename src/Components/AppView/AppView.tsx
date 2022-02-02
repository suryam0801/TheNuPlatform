import React, { useState } from 'react';

// Local Imports
import { Messages } from '../Messages/Messages';
import { MsgInput } from '../MsgInput/MessageInput';
import { TopBar } from '../TopBar/TopBar';
import styles from './styles.module.scss';

const AppView: React.FC = () => {

  const [loading, setLoading] = useState(false);

  // Render
  let mainContent;

  if (true) {
    mainContent = (
      <div className={styles.main}>
        <TopBar title="Title" />
        <Messages />
        <MsgInput />
      </div>
    );
  } else {
    <div>Not In Channel Yet</div>
  }

  return (
    <div className={styles.container}>
      {mainContent}
    </div>
  );
};

export default AppView;
