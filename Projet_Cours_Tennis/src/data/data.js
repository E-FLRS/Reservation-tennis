
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "courttennis-accd1.firebaseapp.com",
    databaseURL: "https://courttennis-accd1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "courttennis-accd1",
    storageBucket: "courttennis-accd1.appspot.com",
    messagingSenderId: "1004694344259",
    appId: "1:1004694344259:web:92264808a3de2327c3faf6",
    measurementId: "G-3V15ER4TXW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchDataFromFirebase = async () => {
    const data = await getDocs(collection(db, 'features'));
    return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

