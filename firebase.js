// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByhZj5WT-YJWQgqS8a5327HLaaYHCrR6M",
  authDomain: "fir-positivethoughtcard.firebaseapp.com",
  projectId: "fir-positivethoughtcard",
  storageBucket: "fir-positivethoughtcard.appspot.com",
  messagingSenderId: "664190234549",
  appId: "1:664190234549:web:c61235d30dc06d9806f3fc",
  measurementId: "G-SSETZ25T1Y"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
export {auth}