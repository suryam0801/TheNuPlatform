import { ChatMessage } from "../../Models/ChatMessage";
import { User } from "../../Models/User";
import { Action } from "../ActionType";

export enum UITrigger_Types {
    SET_INFLUENCER_MODAL_DISPLAY = "SET_INFLUENCER_MODAL_DISPLAY"
}

export interface UITriggerState {
    showInfluencerInfo: boolean
}

const initialState: UITriggerState = {
    showInfluencerInfo: false
}

export const UITriggerReducer = (state: UITriggerState = initialState, action: Action): UITriggerState => {
    switch (action.type) {
        case UITrigger_Types.SET_INFLUENCER_MODAL_DISPLAY:
            return {
                showInfluencerInfo: action.payload
            }
        default:
            return state
    }
};
