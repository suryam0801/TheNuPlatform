import {
    signInWithPhoneNumber,
    getAuth,
    RecaptchaVerifier,
    ConfirmationResult,
    UserCredential,
} from '@firebase/auth';

let confirmationR: ConfirmationResult | null = null;
let userCredential: UserCredential | null | 'wrong otp' = null;

function getAppVerifier() {
    return new RecaptchaVerifier(
        'sign-in-button',
        {
            size: 'invisible',
            callback: (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                //onSignInSubmit();
            },
        },
        getAuth(),
    );
}

export const SignInWithPhoneNumberHelper = async (phoneNumber: string) => {
    await signInWithPhoneNumber(getAuth(), phoneNumber, getAppVerifier()).then(
        function (confirmationResult) {
            confirmationR = confirmationResult;
        },
    );
    return confirmationR?.verificationId;
};

export const VerifyOtp = (otp: string) => {
    confirmationR &&
        confirmationR.confirm(otp).then((result) => {
            userCredential = result !== null ? result : 'wrong otp';
        });
    return userCredential;
};

export function SignOut() {
    if (window.confirm('Are you sure you want to logout?')) {
        getAuth().signOut();
    }
}
