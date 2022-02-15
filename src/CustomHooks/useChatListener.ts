import { useDispatch, useSelector } from "react-redux";
import { ref, onChildAdded, onChildChanged, onChildRemoved, query, orderByChild, equalTo, limitToLast } from "firebase/database";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import { SetMessage, SetMessagesAction } from "../Redux/Actions/ChatActions";
import { useParams } from "react-router-dom";
import { User } from "../Models/User";
import { SetInfluencerAction } from "../Redux/Actions/UserActions";
import { RootState } from "../Store";

export default function useChatsHook() {
    const dispatch = useDispatch();

    const influencer = useSelector((state:RootState) => state.influencerReducer.influencer)

    useEffect(() => {
        listenToMessages(influencer?.UserId ?? "")
    }, [influencer])

    const listenToMessages = (userId: string | null) => {

        dispatch(SetMessagesAction([]));

        const commentsRef = query(ref(db, 'messages'), orderByChild('InfluencerId'), equalTo(userId), limitToLast(100));

        onChildAdded(commentsRef, (data) => {
            dispatch(SetMessage(data.val()))
        });

        onChildChanged(commentsRef, (data) => {

        });

        onChildRemoved(commentsRef, (data) => {

        });
    }
}
