import { query, orderByChild, equalTo, onChildAdded, ref, Query } from 'firebase/database';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebase';
import { User } from '../Models/User';
import { SetUserExistsACtion } from '../Redux/Actions/LoginActions';
import { SetInfluencerAction } from '../Redux/Actions/UserActions';

export default function useGetInfluencer() {

    const dispatch = useDispatch();

    const { username } = useParams();

    useEffect(() => {
        var usersRef: Query = {} as Query

        if (username) {
            usersRef = query(
                ref(db, "users"),
                orderByChild("Username"),
                equalTo((username as string))
            );
        } else {
            usersRef = query(
                ref(db, "users"),
                orderByChild("UserId"),
                equalTo(auth.currentUser?.uid ?? "")
            );
        }

        onChildAdded(usersRef, (data) => {
            if (data) {
                var user = (data.val() as User);
                dispatch(SetInfluencerAction(user))

                if (auth.currentUser && auth.currentUser.uid === user.UserId) {
                    dispatch(SetUserExistsACtion(true))
                } else {
                    dispatch(SetUserExistsACtion(false))
                }
            }
        });
    }, [username])

}
