# Deploy to Firebase
## Install Firebase package
Open a Terminal in VSCode and run `npm install firebase`. Have a look at p `package.json` firebase has been added. \
Get the configuration for Firebase and 
- Go to the Firbase console `https://console.firebase.google.com/`
- Select your project
- Click on the gear next to `Project Overview` and click on `Project Settings`
- There should be a `Your Apps` section. Select your web app in there. You can do some changes in there if you want to. Under `Firebase snippets` select `Config`. There will be a code block `const firebaseConfig = { ... ` in here that you will need in a moment.
- Switch to VSCode and create a new file `src/utils/firebase.ts` with the following content:
```
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Insert the code block starting with `const firebaseConfig = { ...` from the Firebase console.

// Initialize 
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
```
## Enable Authentication in Firebase
- Go to the Firbase console `https://console.firebase.google.com/`
- Select your project
- Click on `Authentication` and then `Get started`
- Click on `Sign-In Methode`, click on `Email/Password` and enable it 