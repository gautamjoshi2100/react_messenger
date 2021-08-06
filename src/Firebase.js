import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCIW7_APHlXpLyrokvwzUrPzM3yatidfhc",
    authDomain: "discord-58765.firebaseapp.com",
    projectId: "discord-58765",
    storageBucket: "discord-58765.appspot.com",
    messagingSenderId: "641700486970",
    appId: "1:641700486970:web:d37a055096bb4046803a03",
    measurementId: "G-W9HR84QTYE"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;