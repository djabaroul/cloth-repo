import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBFnjZDGkCiuRNNlNcu86ZRHkG-ZQzGKQI",
    authDomain: "cloth-db-4270c.firebaseapp.com",
    databaseURL: "https://cloth-db-4270c.firebaseio.com",
    projectId: "cloth-db-4270c",
    storageBucket: "cloth-db-4270c.appspot.com",
    messagingSenderId: "913713515882",
    appId: "1:913713515882:web:e928b31541abb5599c2913",
    measurementId: "G-4VQB3H5QYY"
  };

   export const createUserProfileDocument= async (userAuth,additionalData) => {
       if(!userAuth) return;

       //console.log(firestore.doc('users/128fdashadu'));
       const userRef = firestore.doc(`users/${userAuth.uid}`);
       const snapShot = await userRef.get();
      // console.log(snapShot);
       if(!snapShot.exists) {
           const {displayName , email} = userAuth;
           const createdAt = new Date();

           try {
               await userRef.set({
                   displayName,
                   email,
                   createdAt,
                   ...additionalData

               })

           } catch(error) {
               console.log('error creating user',error.message);

           }
       }
       return userRef;

   };

  firebase.initializeApp(config);

  export const auth =firebase.auth();

  export const firestore = firebase.firestore();

  const provider =new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle= () => auth.signInWithPopup(provider);

  export default firebase;
