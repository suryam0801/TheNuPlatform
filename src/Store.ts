import { createStore, applyMiddleware, combineReducers } from "redux"; 
import thunk from "redux-thunk";
import { ChatReducer } from "./Redux/Reducers/ChatReducer";
import { UserReducer } from "./Redux/Reducers/UserReducer";

const rootReducer = combineReducers({
    chatsState: ChatReducer,
    userReducer: UserReducer
});

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store

export type RootState = ReturnType<typeof rootReducer>