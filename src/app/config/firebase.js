import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBsr7-HNkux-1B22g45jnBCGrc85YgJPm0",
  authDomain: "react-fs-events.firebaseapp.com",
  databaseURL: "https://react-fs-events.firebaseio.com",
  projectId: "react-fs-events",
  storageBucket: "react-fs-events.appspot.com",
  messagingSenderId: "611609735341"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;