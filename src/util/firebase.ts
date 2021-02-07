import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { readable } from 'svelte/store';

const firebaseConfig = {
    apiKey: "AIzaSyBLRGGGYN_ugwTBM_MNfmcBrxXvzJbLYUw",
    authDomain: "svelte-bootstrap-tutorial.firebaseapp.com",
    projectId: "svelte-bootstrap-tutorial",
    storageBucket: "svelte-bootstrap-tutorial.appspot.com",
    messagingSenderId: "458671755623",
    appId: "1:458671755623:web:2ea49ff195984ed31ddfc2"
};

// Initialize 
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const loggedInUser = readable(null, (set) => {
	auth.onAuthStateChanged(user => {
        // Making it and object to distinguish between not initialized yet
        // and not logged in
        set({user: user});
    });
});