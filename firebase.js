import { initializeApp } from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD6ZcEPIclrLmRvjE-jVEqt0RkSK9ofWC0',
  authDomain: 'fir-91d38.firebaseapp.com',
  projectId: 'fir-91d38',
  storageBucket: 'fir-91d38.appspot.com',
  messagingSenderId: '476454991958',
  appId: '1:476454991958:web:96c118398dd68e3beb63f7',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
