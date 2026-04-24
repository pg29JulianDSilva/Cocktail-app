import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDS-fe4j2Ud39MrN_n22o9lYuZGO9Xog90",
  authDomain: "cocktail-register.firebaseapp.com",
  projectId: "cocktail-register",
  storageBucket: "cocktail-register.firebasestorage.app",
  messagingSenderId: "266133933054",
  appId: "1:266133933054:web:bb5ccf914671b3dad7ceaf",
  measurementId: "G-SW877HZ7JP"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
