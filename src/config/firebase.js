import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

firebase.initializeApp({
  apiKey: "AIzaSyAk6uK2cjZAhLeSd6xbZt372ikefjcxNjs",
  authDomain: "navrang-41522.firebaseapp.com",
  projectId: "navrang-41522",
  storageBucket: "navrang-41522.appspot.com",
  messagingSenderId: "923949446725",
  appId: "1:923949446725:web:0a133746b156960c28952c",
  measurementId: "G-0ZR4QE15C1",
});

export const firestore = firebase.firestore();
