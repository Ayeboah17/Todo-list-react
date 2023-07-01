import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBlffByXgnTmUK7mZ3Qv1Y6Xxj-QlQrLQg",
    authDomain: "union-members.firebaseapp.com",
    projectId: "union-members",
    storageBucket: "union-members.appspot.com",
    messagingSenderId: "719319972488",
    appId: "1:719319972488:web:26b5986220ce55789abd3d",
    measurementId: "G-SMPLHLB9HR"
  };

  const app = initializeApp(firebaseConfig)
  export const db  = getFirestore(app)