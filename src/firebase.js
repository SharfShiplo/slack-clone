import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyA_OF4JMT5KepVdhdFP4DoMDSAInZBHwFY",
    authDomain: "slack-clone-9cf01.firebaseapp.com",
    projectId: "slack-clone-9cf01",
    storageBucket: "slack-clone-9cf01.appspot.com",
    messagingSenderId: "788509808070",
    appId: "1:788509808070:web:0fea229d62b1aa6f9e0ec7",
    measurementId: "G-QBQ0KWCS30"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db }