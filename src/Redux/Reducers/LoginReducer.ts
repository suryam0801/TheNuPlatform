import { ConfirmationResult } from "firebase/auth";
import { ChatMessage } from "../../Models/ChatMessage";
import { Action } from "../ActionType";

export enum LoginReducer_Types {
    SET_CODE = "SET_CODE",
    SET_PNO = "SET_PNO",
    SET_OTP_SHOW = "SET_OTP_SHOW",
    SET_OTP = "SET_OTP",
    SET_CONFIRMATION_RESULT = "SET_CONFIRMATION_RESULT"
}

export interface LoginState {
    code: string,
    pno: string,
    otpShow: boolean,
    otp: string,
    confirmationR: ConfirmationResult | null
}

const initialState: LoginState = {
    code: "",
    pno: "",
    otpShow: false,
    otp: "",
    confirmationR: null
}

export const LoginReducer = (state: LoginState = initialState, action: Action): LoginState => {
    switch (action.type) {
        case LoginReducer_Types.SET_CODE:
            return {
                ...state,
                code: action.payload
            }
        case LoginReducer_Types.SET_PNO:
            return {
                ...state,
                pno: action.payload
            }
        case LoginReducer_Types.SET_OTP_SHOW:
            return {
                ...state,
                otpShow: action.payload
            }
        case LoginReducer_Types.SET_OTP:
            return {
                ...state,
                otp: action.payload
            }
        case LoginReducer_Types.SET_CONFIRMATION_RESULT:
            return {
                ...state,
                confirmationR: action.payload
            }
        default:
            return state
    }
};
