import { createStore, applyMiddleware, combineReducers } from "redux"; 
import thunk from "redux-thunk";
import { ChatReducer } from "./Redux/Reducers/ChatReducer";
import { SelectedCategoryReducer } from "./Redux/Reducers/SelectedCategoryReducer";
import { UITriggerReducer } from "./Redux/Reducers/UITriggerReducer";
import { UserReducer } from "./Redux/Reducers/UserReducer";

const rootReducer = combineReducers({
    chatsState: ChatReducer,
    userReducer: UserReducer,
    selectedCategoryReducer: SelectedCategoryReducer,
    uiTriggerReducer: UITriggerReducer
});

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store

export type RootState = ReturnType<typeof rootReducer>