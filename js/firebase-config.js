// Firebase project settings for Pinch of Spice.
//
// These values are PUBLIC by design - Firebase expects them in client code.
// What actually protects your data is the Firestore security rules
// (see firestore.rules), which only let the one admin account read orders.
//
// Replace the placeholder strings with the values from:
//   Firebase Console -> Project settings -> Your apps -> Web app -> SDK setup
export const firebaseConfig = {
    apiKey: "PASTE_API_KEY_HERE",
    authDomain: "PASTE_PROJECT_ID_HERE.firebaseapp.com",
    projectId: "PASTE_PROJECT_ID_HERE",
    storageBucket: "PASTE_PROJECT_ID_HERE.appspot.com",
    messagingSenderId: "PASTE_SENDER_ID_HERE",
    appId: "PASTE_APP_ID_HERE"
};

// Set to false once the values above are filled in.
export const FIREBASE_NOT_CONFIGURED = true;
