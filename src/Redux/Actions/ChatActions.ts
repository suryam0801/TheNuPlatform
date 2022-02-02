import { RootState } from "../../Store";
import { Action } from "../ActionType";
import { ThunkAction } from "redux-thunk";
import { ChatMessage } from "../../Models/ChatMessage";
import { ChatReducer_Types } from "../Reducers/ChatReducer";
import { db } from "../../firebase";
import { query, get, ref, equalTo, orderByChild, onValue } from "firebase/database"
import { CategorisedMessage } from "../../Models/CategorisedMessage";

function SetMessageAction(message: ChatMessage) {
    return {
        type: ChatReducer_Types.APPEND_NEW_MESSAGE,
        payload: message
    };
}

function SetMessagesAction(messages: ChatMessage[]) {
    return {
        type: ChatReducer_Types.SET_MESSAGES,
        payload: messages
    };
}

function SetCategorisedMessagesAction(messages: CategorisedMessage[]) {
    return {
        type: ChatReducer_Types.SET_CATEGORISED_MESSAGES,
        payload: messages
    };
}


export const SetMessage = (message: ChatMessage): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    dispatch(SetMessageAction(message))
}

export const GetMessages = (userId: string): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    const messagesRef = query(ref(db, 'messages'), orderByChild('InfluencerId'), equalTo(userId));

    onValue(messagesRef, (snapshot) => {
        var messages: ChatMessage[] = []
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            messages.push(childData);
        });

        dispatch(SetMessagesAction(messages));
        dispatch(GetMessagesByCategory())
    }, {
        onlyOnce: true
    });
}

export const GetMessagesByCategory = (): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    const currentMessages = getState().chatsState.messages

    var Hate: ChatMessage[] = []
    var Normal: ChatMessage[] = []
    var Question: ChatMessage[] = []
    var Love: ChatMessage[] = []

    currentMessages.forEach(message => {
        switch (message.Category && message.Category) {
            case "Hate":
                Hate.push(message)
                break;
            case "Normal":
                Normal.push(message)
                break;
            case "Question":
                Question.push(message)
                break;
            case "Love":
                Love.push(message)
                break;
        }
    });

    var categorisedMessages:CategorisedMessage[] = [];
    categorisedMessages.push({Category: "Hate", Messages: Hate});
    categorisedMessages.push({Category: "Normal", Messages: Normal});
    categorisedMessages.push({Category: "Question", Messages: Question});
    categorisedMessages.push({Category: "Love", Messages: Love});

    dispatch(SetCategorisedMessagesAction(categorisedMessages));
}