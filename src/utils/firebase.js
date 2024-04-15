// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: 'nextjs-fullstack-blog-9eb48.firebaseapp.com',
  projectId: 'nextjs-fullstack-blog-9eb48',
  storageBucket: 'nextjs-fullstack-blog-9eb48.appspot.com',
  messagingSenderId: '542474122382',
  appId: '1:542474122382:web:f4f6abc5dc3cd7f2d785df',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
