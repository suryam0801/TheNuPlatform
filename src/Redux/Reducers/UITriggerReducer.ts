import { ChatMessage } from "../../Models/ChatMessage";
import { User } from "../../Models/User";
import { Action } from "../ActionType";

export enum UITrigger_Types {
    SET_LOADING = "SET_LOADING"
}

export interface UITriggerState {
    showLoader: boolean
}

const initialState: UITriggerState = {
    showLoader: false
}

export const UITriggerReducer = (state: UITriggerState = initialState, action: Action): UITriggerState => {
    switch (action.type) {
        case UITrigger_Types.SET_LOADING:
            return {
                showLoader: action.payload
            }
        default:
            return state
    }
};
