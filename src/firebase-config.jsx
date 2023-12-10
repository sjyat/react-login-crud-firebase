// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIxKdNZiKuNbtyT3MPWiOsD7FyByXQhgc",
  authDomain: "bd-clientes-484a1.firebaseapp.com",
  projectId: "bd-clientes-484a1",
  storageBucket: "bd-clientes-484a1.appspot.com",
  messagingSenderId: "228005820348",
  appId: "1:228005820348:web:b19f1e74fbaed8de9e5db9",
  measurementId: "G-FPPLJXGGYD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;

export const db = getFirestore(app); // exportamos la base de datos de firebase
