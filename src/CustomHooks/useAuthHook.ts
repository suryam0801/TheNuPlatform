import {
    signInWithPhoneNumber,
    getAuth,
    RecaptchaVerifier,
    ConfirmationResult,
    UserCredential,
} from '@firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearLoginStates, SetConfirmationResultAction, SetOtpShowAction } from '../Redux/Actions/LoginActions';
import { RootState } from '../Store';

export default function useAuthHook() {
    const auth = getAuth();

    const dispatch = useDispatch();

    const code = useSelector((state: RootState) => state.loginReducer.code)
    const pno = useSelector((state: RootState) => state.loginReducer.pno)
    const otpShow = useSelector((state: RootState) => state.loginReducer.otpShow)
    const otp = useSelector((state: RootState) => state.loginReducer.otp)
    const confirmationR = useSelector((state: RootState) => state.loginReducer.confirmationR)

    useEffect(() => {
        console.log(confirmationR)
    }, [confirmationR])

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
        const phoneNumber = code + "" + pno
        await signInWithPhoneNumber(auth, phoneNumber, getAppVerifier()).then(
            function (confirmationResult) {
                dispatch(SetConfirmationResultAction(confirmationResult))
                dispatch(SetOtpShowAction(true));
            },
        ).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error)
        });
    };

    const VerifyOtp = () => {
        confirmationR &&
            confirmationR.confirm(otp).then((result) => {
                // User signed in successfully.
                const user = result.user;
                dispatch(ClearLoginStates());
                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log(error)
            });
    };

    function SignOut() {
        if (window.confirm('Are you sure you want to logout?')) {
            dispatch(ClearLoginStates());
            getAuth().signOut();
        }
    }

    return { code, pno, otpShow, otp, SignInWithPhoneNumberHelper, VerifyOtp, SignOut }
}
