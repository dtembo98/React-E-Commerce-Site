import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCaiQ2Gv8veeVI9g8LgssZkHBLMm5NMdR0",
  authDomain: "crown-db-da2c5.firebaseapp.com",
  databaseURL: "https://crown-db-da2c5.firebaseio.com",
  projectId: "crown-db-da2c5",
  storageBucket: "crown-db-da2c5.appspot.com",
  messagingSenderId: "252936639812",
  appId: "1:252936639812:web:d9b23a694b86a6a48f3311",
  measurementId: "G-4BTRRTME71"
};
// Initialize Firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    console.log(userAuth);
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInwithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
