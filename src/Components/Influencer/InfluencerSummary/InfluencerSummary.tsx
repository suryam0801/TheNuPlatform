import React from 'react';
import { useSelector } from 'react-redux';

// Local Imports
import styles from './styles.module.scss';
import { RootState } from '../../../Store';
import { CategorisedMessage } from '../../../Models/CategorisedMessage';

export const InfluencerSummary: React.FC = () => {

    const user = useSelector((state: RootState) => state.userReducer.user)
    const categorisedMessages = useSelector((state: RootState) => state.chatsState.categorisedMessages)

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Welcome {user?.Username ?? ""}</h2>
            </div>

            {/* {categorisedMessages && categorisedMessages.map(
                (categorisedMessage: CategorisedMessage, index: number) => (
                    <div>
                        <div>{categorisedMessage.Category}</div>
                        <div>{categorisedMessage.Messages.length}</div>
                    </div>
                )
            )} */}
        </div>
    );
};