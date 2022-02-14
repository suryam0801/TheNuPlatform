import { RootState } from "../../Store";
import { Action } from "../ActionType";
import { ThunkAction } from "redux-thunk";
import { User } from "../../Models/User";
import { UserReducer_Type } from "../Reducers/UserReducer";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { GetMessages } from "./ChatActions";

function SetUserAction(user: User | null) {
    return {
        type: UserReducer_Type.SET_LOGGED_IN_USER,
        payload: user
    };
}

export const GetUser = (userId: string): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    const usersRef = ref(db, 'users/' + userId);
    onValue(usersRef, (snapshot) => {
        const user = snapshot.val();
        dispatch(SetUserAction(user))
    });
}
