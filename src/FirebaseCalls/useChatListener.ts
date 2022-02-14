import { useDispatch, useSelector } from "react-redux";
import { ref, onChildAdded, onChildChanged, onChildRemoved, query, orderByChild, equalTo, limitToLast } from "firebase/database";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import { SetMessage } from "../Redux/Actions/ChatActions";
import { RootState } from "../Store";
import { useParams } from "react-router-dom";

export default function useChatsHook() {
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {

        var searchBy:string = ""

        if (auth.currentUser?.uid) {
            searchBy = auth.currentUser!.uid;
        } else if (id) {
            searchBy = id!
        }

        const commentsRef = query(ref(db, 'messages'), orderByChild('InfluencerId'), equalTo(searchBy), limitToLast(100));

        onChildAdded(commentsRef, (data) => {
            dispatch(SetMessage(data.val()))
        });

        onChildChanged(commentsRef, (data) => {

        });

        onChildRemoved(commentsRef, (data) => {

        });
    }, [])
}
