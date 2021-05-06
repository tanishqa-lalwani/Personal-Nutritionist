// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'
  
//import 'firebase/auth';
//import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2n-Nad47j1a-glTI5ADpvuKnVd3UQPFE",
  authDomain: "personal-nutritionist-g29.firebaseapp.com",
  projectId: "personal-nutritionist-g29",
  storageBucket: "personal-nutritionist-g29.appspot.com",
  messagingSenderId: "400715200185",
  appId: "1:400715200185:web:c3db821843152f99794d68",
  measurementId: "G-54SH5FPFGE"
  };

  const firebaseApp =  firebase.initializeApp(firebaseConfig);
//firebase.analytics();
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const storage = firebaseApp.storage();

export { db ,firebase, auth, storage};