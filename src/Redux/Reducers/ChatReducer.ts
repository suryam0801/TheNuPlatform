import { CategorisedMessage } from "../../Models/CategorisedMessage";
import { ChatMessage } from "../../Models/ChatMessage";
import { Action } from "../ActionType";

export enum ChatReducer_Types {
    SET_MESSAGES = "SET_MESSAGES",
    SET_CATEGORISED_MESSAGES = "SET_CATEGORISED_MESSAGES",
    APPEND_NEW_MESSAGE = "APPEND_NEW_MESSAGE"
}

export interface ChatState {
    messages: ChatMessage[]
    categorisedMessages: CategorisedMessage[]
}

const initialState: ChatState = {
    messages: [],
    categorisedMessages: []
}

export const ChatReducer = (state: ChatState = initialState, action: Action): ChatState => {
    switch (action.type) {
        case ChatReducer_Types.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case ChatReducer_Types.SET_CATEGORISED_MESSAGES:
            return {
                ...state,
                categorisedMessages: action.payload
            }
        case ChatReducer_Types.APPEND_NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state
    }
};
