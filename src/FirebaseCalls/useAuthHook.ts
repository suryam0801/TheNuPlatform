import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState } from 'react'
import { User } from "../Models/User";
import { writeNewUser } from "./FirebaseCalls";

export default function useAuthHook() {
    const auth = getAuth();

    function makeUser(name:string, email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                var userObj = {Username: name, UserId: user.uid, Email: email} as User

                writeNewUser(userObj)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case "auth/email-already-in-use":
                        signInUser(email, password)
                        break;
                }
            });
    }

    function signInUser(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case "auth/wrong-password":
                        //TODO: Handle wrong password
                        break;
                }
            });
    }

    function logOut() {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    return { makeUser, signInUser, logOut };
}
