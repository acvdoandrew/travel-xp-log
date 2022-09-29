/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAuek5s_-JgWlh5CzgQ_zJCeV8FGDrA3os',
  authDomain: 'travel-xp-log.firebaseapp.com',
  projectId: 'travel-xp-log',
  storageBucket: 'travel-xp-log.appspot.com',
  messagingSenderId: '1067575903998',
  appId: '1:1067575903998:web:339316ef8472d3290247af',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
