import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCE4JN4JjSnp4F2zs7Q_sA-H3XvNhzN2Pg',
  authDomain: 'localchefbazaar-acbe4.firebaseapp.com',
  projectId: 'localchefbazaar-acbe4',
  storageBucket: 'localchefbazaar-acbe4.appspot.com',
  messagingSenderId: '268565496988',
  appId: '1:268565496988:web:e9e9d0427ea67a203c5959',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
