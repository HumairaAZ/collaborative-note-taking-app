import firebase from 'firebase/app';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs1dXhSoIe9fretf-Tn38XSbsSGyzDxes",
  authDomain: "collaborative-note-taking-app1.firebaseapp.com",
  projectId: "collaborative-note-taking-app1",
  storageBucket: "collaborative-note-taking-app1.appspot.com",
  messagingSenderId: "504934917091",
  appId: "1:504934917091:web:87056f4980cbcba5f7f6d6",
  measurementId: "G-R34PEFWXXR"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db };
