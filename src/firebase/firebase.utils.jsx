import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyAiHiR1VpaHR9vgeZKJb_4kkPDy1dpO2BE",
  authDomain: "afro-clothing-fb999.firebaseapp.com",
  projectId: "afro-clothing-fb999",
  storageBucket: "afro-clothing-fb999.appspot.com",
  messagingSenderId: "915890910339",
  appId: "1:915890910339:web:f2032f4f34ff00df7c57b6",
  measurementId: "G-9TNX89ZBTX"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
// We want to trigger the google pop whenever we use the GoogleAuthProvider
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //If the userAuth object doesn't exist, we don't want to run the function
  if (!userAuth) return;

  // Get a reference to the place in the database where the user is stored
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();
//We are creating the user data.
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('error creating user', error.message);
    }
  }

  return getUserDocumentRef(userAuth.uid);
};

export const getUserDocumentRef = async uid => {
  if (!uid) return null;

  try {
    return firestore.doc(`users/${uid}`);
  } catch (error) {
    console.error('error fetching user', error.message);
  }
};

export default firebase;
