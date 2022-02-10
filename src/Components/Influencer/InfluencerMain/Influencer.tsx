import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase';
import { GetUser } from '../../../Redux/Actions/UserActions';
import { Messages } from '../../Messages/Messages';
import { MsgInput } from '../../MsgInput/MessageInput';

// Local Imports
import ChipsArray from '../InfluencerSummary/InfluencerSummary';
import styles from '../../Chat/styles.module.scss';

const Influencer: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetUser(auth.currentUser!.uid))
    }, [])

    // Render    
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <ChipsArray></ChipsArray>
                <Messages></Messages>
                <MsgInput></MsgInput>
            </div>
        </div>
    );
};

export default Influencer;
