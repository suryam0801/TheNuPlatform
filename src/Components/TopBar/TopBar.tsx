import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  title?: String;
  //menuClick: () => void;
};

export const TopBar: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <IconButton className={styles.iconButton}
        //onClick={props.menuClick}
        >
          <MenuIcon className={styles.menu} fontSize="large" />
        </IconButton>
        <h2 className={styles.title}>{props.title}</h2>
      </div>
    </div>
  );
};