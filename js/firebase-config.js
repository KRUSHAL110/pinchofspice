// Firebase project settings for Pinch of Spice.
//
// These values are PUBLIC by design - Firebase expects them in client code.
// What actually protects customer data is firestore.rules, which only lets
// the single admin account read orders.
export const firebaseConfig = {
    apiKey: "AIzaSyBsvFpsRAWnGEpIWbXyNxgRQsbBqdkx0VE",
    authDomain: "pinchofspic.firebaseapp.com",
    projectId: "pinchofspic",
    storageBucket: "pinchofspic.firebasestorage.app",
    messagingSenderId: "503434247185",
    appId: "1:503434247185:web:7d0c4dd64bf9e7f1b505b0"
};

export const FIREBASE_NOT_CONFIGURED = false;
