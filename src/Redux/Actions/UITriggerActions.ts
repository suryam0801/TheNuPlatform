import {UITrigger_Types} from "../Reducers/UITriggerReducer"

export default function SetShowInfluencerInfo(trigger: boolean) {
    return {
        type: UITrigger_Types.SET_INFLUENCER_MODAL_DISPLAY,
        payload: trigger
    };
}