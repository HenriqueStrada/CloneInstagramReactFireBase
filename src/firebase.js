import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAXi-o2rQA4f_wagKbNrti6nTME6P3Qpus",
    authDomain: "clonedoinstagram.firebaseapp.com",
    projectId: "clonedoinstagram",
    storageBucket: "clonedoinstagram.appspot.com",
    messagingSenderId: "670483687812",
    appId: "1:670483687812:web:d8301b5a3746eb6c17d5d1",
    measurementId: "G-9968D4M3M3"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export {db, auth, storage, functions};