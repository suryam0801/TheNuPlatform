import { createStore, applyMiddleware, combineReducers } from "redux"; 
import thunk from "redux-thunk";
import { ChatReducer } from "./Redux/Reducers/ChatReducer";
import { LoginReducer } from "./Redux/Reducers/LoginReducer";
import { SelectedCategoryReducer } from "./Redux/Reducers/SelectedCategoryReducer";
import { UITriggerReducer } from "./Redux/Reducers/UITriggerReducer";
import { InfluencerReducer } from "./Redux/Reducers/UserReducer";

const rootReducer = combineReducers({
    chatsState: ChatReducer,
    influencerReducer: InfluencerReducer,
    selectedCategoryReducer: SelectedCategoryReducer,
    uiTriggerReducer: UITriggerReducer,
    loginReducer: LoginReducer
});

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store

export type RootState = ReturnType<typeof rootReducer>