
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchDataFromFirebase = async () => {
    const data = await getDocs(collection(db, 'features'));
    return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

