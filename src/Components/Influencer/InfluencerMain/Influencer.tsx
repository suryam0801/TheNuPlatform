import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase';
import { GetUser } from '../../../Redux/Actions/UserActions';
import { Messages } from '../../Messages/Messages';
import { MsgInput } from '../../MsgInput/MessageInput';

// Local Imports
import { NavBarBottom } from '../../NavBarBottom/NavBarBottom';
import CategorisedMessages from '../CategorisedMessages/CategorisedMessages';
import { InfluencerSummary } from '../InfluencerSummary/InfluencerSummary';
import styles from './styles.module.scss';

const Influencer: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetUser(auth.currentUser!.uid))
    }, [])

    // Render    
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <InfluencerSummary></InfluencerSummary>
                {/* <CategorisedMessages /> */}
                <Messages></Messages>
                <MsgInput></MsgInput>
                <NavBarBottom></NavBarBottom>
            </div>
        </div>
    );
};

export default Influencer;
