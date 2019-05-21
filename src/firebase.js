
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBPCdeiGfJnAheNeqT8z2VjLOIZionljeQ",
  authDomain: "react-chat-aps-5-sem.firebaseapp.com",
  databaseURL: "https://react-chat-aps-5-sem.firebaseio.com",
  projectId: "react-chat-aps-5-sem",
  storageBucket: "react-chat-aps-5-sem.appspot.com",
  messagingSenderId: "340390402374",
  appId: "1:340390402374:web:0f7e5890ccb63f9f"
}; 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;