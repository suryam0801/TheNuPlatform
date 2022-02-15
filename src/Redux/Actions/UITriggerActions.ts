import {UITrigger_Types} from "../Reducers/UITriggerReducer"

export function SetLoadingScreenAction(trigger: boolean) {
    return {
        type: UITrigger_Types.SET_LOADING,
        payload: trigger
    };
}