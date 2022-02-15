import { ChatMessage } from "../../Models/ChatMessage";
import { User } from "../../Models/User";
import { Action } from "../ActionType";

export enum CurrentInfluencerReducer_Types {
    SET_CURRENT_INFLUENCER = "SET_CURRENT_INFLUENCER"
}

export interface InfluencerState {
    influencer: User | null
}

const initialState: InfluencerState = {
    influencer: null
}

export const InfluencerReducer = (state: InfluencerState = initialState, action: Action): InfluencerState => {
    switch (action.type) {
        case CurrentInfluencerReducer_Types.SET_CURRENT_INFLUENCER:
            return {
                influencer: action.payload
            }
        default:
            return state
    }
};
