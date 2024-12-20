import {initializeApp} from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import{
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCVe37tyPw_ry8BZxkeyyvtgult90wBgVA",
    authDomain: "e-commerce-db-265be.firebaseapp.com",
    projectId: "e-commerce-db-265be",
    storageBucket: "e-commerce-db-265be.appspot.com",
    messagingSenderId: "706709739581",
    appId: "1:706709739581:web:816021736b64503a8ff254"
  };
  
  // const firebaseApp = initializeApp(firebaseConfig);
  initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    })
    await batch.commit();
    console.log('Done')
  }

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})

    return categoryMap;
  }

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

  export const signOutUser = async () => await signOut(auth)

  export const onAuthStageChangeListener = (callback) => onAuthStateChanged(auth, callback)