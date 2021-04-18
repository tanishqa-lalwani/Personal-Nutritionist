// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'
  
//import 'firebase/auth';
//import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCIxJQb8eDVqC2g6Oo3eo0sAszt1WDrgLs",
    authDomain: "personal-nutritionist-6e19a.firebaseapp.com",
    projectId: "personal-nutritionist-6e19a",
    storageBucket: "personal-nutritionist-6e19a.appspot.com",
    messagingSenderId: "681616636716",
    appId: "1:681616636716:web:4762d820dc950446460a89",
    measurementId: "G-GVMTBP2823"
  };

  const firebaseApp =  firebase.initializeApp(firebaseConfig);
//firebase.analytics();
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();

export { db ,firebase, auth};