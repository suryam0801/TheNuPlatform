import { RootState } from "../../Store";
import { Action } from "../ActionType";
import { ThunkAction } from "redux-thunk";
import { User } from "../../Models/User";
import { CurrentInfluencerReducer_Types } from "../Reducers/UserReducer";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { SetUserExistsACtion } from "./LoginActions";

export function SetInfluencerAction(infleuncer: User | null) {
    return {
        type: CurrentInfluencerReducer_Types.SET_CURRENT_INFLUENCER,
        payload: infleuncer
    };
}

export const GetInfluencer = (userId: string): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    const usersRef = ref(db, 'users/' + userId);
    onValue(usersRef, (snapshot) => {

        if (snapshot.exists()) {
            const user = snapshot.val();
            dispatch(SetInfluencerAction(user))
            dispatch(SetUserExistsACtion(true))
        } else {
            dispatch(SetUserExistsACtion(false))
        }
    });
}
