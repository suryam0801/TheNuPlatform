import {
    signInWithPhoneNumber,
    getAuth,
    RecaptchaVerifier
} from '@firebase/auth';
import { child, ref, get } from 'firebase/database';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { ClearLoginStates, SetConfirmationResultAction, SetOtpShowAction, SetUserExistsACtion } from '../Redux/Actions/LoginActions';
import { SetLoadingScreenAction } from '../Redux/Actions/UITriggerActions';
import { RootState } from '../Store';

export default function useAuthHook() {
    const auth = getAuth();

    const dispatch = useDispatch();

    const code = useSelector((state: RootState) => state.loginReducer.code)
    const pno = useSelector((state: RootState) => state.loginReducer.pno)
    const otpShow = useSelector((state: RootState) => state.loginReducer.otpShow)
    const otp = useSelector((state: RootState) => state.loginReducer.otp)
    const confirmationR = useSelector((state: RootState) => state.loginReducer.confirmationR)

    function getAppVerifier() {
        return new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': () => {
                console.log("success")
            },
            'expired-callback': () => {
                console.log("expired")
            }
        }, auth);
    }


    const SignInWithPhoneNumberHelper = async () => {
        dispatch(SetLoadingScreenAction(true))
        const phoneNumber = code + "" + pno
        await signInWithPhoneNumber(auth, phoneNumber, getAppVerifier()).then(
            function (confirmationResult) {
                dispatch(SetConfirmationResultAction(confirmationResult))
                dispatch(SetOtpShowAction(true));
                dispatch(SetLoadingScreenAction(false))
            },
        ).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error)
            dispatch(SetLoadingScreenAction(false))
        });
    };

    const VerifyOtp = () => {
        dispatch(SetLoadingScreenAction(true))
        confirmationR &&
            confirmationR.confirm(otp).then((result) => {
                // User signed in successfully.
                const user = result.user;
                CheckUser();
                dispatch(ClearLoginStates());
                dispatch(SetLoadingScreenAction(false))
                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log(error)
                dispatch(SetLoadingScreenAction(false))
            });
    };

    function CheckUser() {
        dispatch(SetLoadingScreenAction(true))
        get(child(ref(db), `users/${auth.currentUser?.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(SetUserExistsACtion(true))
            } else {
                dispatch(SetUserExistsACtion(false))
            }
            dispatch(SetLoadingScreenAction(false))
        }).catch((error) => {
            console.error(error);
            dispatch(SetLoadingScreenAction(false))
        });
    }

    function SignOut() {
        if (window.confirm('Are you sure you want to logout?')) {
            dispatch(ClearLoginStates());
            getAuth().signOut();
        }
    }

    return { code, pno, otpShow, otp, SignInWithPhoneNumberHelper, VerifyOtp, CheckUser, SignOut }
}
