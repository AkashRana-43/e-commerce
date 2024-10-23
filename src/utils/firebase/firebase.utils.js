import {initializeApp} from 'firebase/app'
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import{
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCVe37tyPw_ry8BZxkeyyvtgult90wBgVA",
    authDomain: "e-commerce-db-265be.firebaseapp.com",
    projectId: "e-commerce-db-265be",
    storageBucket: "e-commerce-db-265be.appspot.com",
    messagingSenderId: "706709739581",
    appId: "1:706709739581:web:816021736b64503a8ff254"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)
    
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return signInWithEmailAndPassword(auth, email, password);
  }