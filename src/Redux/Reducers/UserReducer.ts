import { ChatMessage } from "../../Models/ChatMessage";
import { User } from "../../Models/User";
import { Action } from "../ActionType";

export enum UserReducer_Type {
    SET_LOGGED_IN_USER = "SET_LOGGED_IN_USER"
}

export interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}

export const UserReducer = (state: UserState = initialState, action: Action): UserState => {
    switch (action.type) {
        case UserReducer_Type.SET_LOGGED_IN_USER:
            return {
                user: action.payload
            }
        default:
            return state
    }
};
