import { useDispatch, useSelector } from "react-redux";
import { ref, onChildAdded, onChildChanged, onChildRemoved, query, orderByChild, equalTo } from "firebase/database";
import {db} from "../firebase";
import { useEffect } from "react";
import { SetMessage } from "../Redux/Actions/ChatActions";
import { RootState } from "../Store";

export default function useChatsHook() {
    const dispatch = useDispatch();

    const loggedInUser = useSelector((state: RootState) => state.userReducer.user)

    useEffect(() => {
        const commentsRef = query(ref(db, 'messages'), orderByChild('InfluencerId'), equalTo(loggedInUser?.UserId ?? ""));

        onChildAdded(commentsRef, (data) => {
            dispatch(SetMessage(data.val()))
        });

        onChildChanged(commentsRef, (data) => {

        });

        onChildRemoved(commentsRef, (data) => {

        });
    }, [])
}
