import { ConfirmationResult } from "firebase/auth";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../Store";
import { Action } from "../ActionType";
import { LoginReducer_Types } from "../Reducers/LoginReducer";

export function SetCodeAction(code: string) {
    return {
        type: LoginReducer_Types.SET_CODE,
        payload: code
    };
}

export function SetOtpAction(otp: string) {
    return {
        type: LoginReducer_Types.SET_OTP,
        payload: otp
    };
}

export function SetOtpShowAction(otpShow: boolean) {
    return {
        type: LoginReducer_Types.SET_OTP_SHOW,
        payload: otpShow
    };
}

export function SetPNOAction(pno: string) {
    return {
        type: LoginReducer_Types.SET_PNO,
        payload: pno
    };
}

export function SetConfirmationResultAction(confirmR: ConfirmationResult | null) {
    return {
        type: LoginReducer_Types.SET_CONFIRMATION_RESULT,
        payload: confirmR
    };
}

export const ClearLoginStates = (): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    dispatch(SetCodeAction(""))
    dispatch(SetOtpAction(""))
    dispatch(SetPNOAction(""))
    dispatch(SetConfirmationResultAction(null))
    dispatch(SetOtpShowAction(false))
}
