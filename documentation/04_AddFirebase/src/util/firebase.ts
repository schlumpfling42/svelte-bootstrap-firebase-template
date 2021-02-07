import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { readable } from 'svelte/store';


// Insert the code block starting with `const firebaseConfig = { ...` from the Firebase console.

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