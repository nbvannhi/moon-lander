import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDQaP0-rvX7NoUxVPMEpphP-3QYqaZ0_Ac",
  authDomain: "moon-lander-orbital21.firebaseapp.com",
  databaseURL: "https://moon-lander-orbital21-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "moon-lander-orbital21",
  storageBucket: "moon-lander-orbital21.appspot.com",
  messagingSenderId: "829329878613",
  appId: "1:829329878613:web:998e745471b746e60e2edc"
}

export default firebase.initializeApp(firebaseConfig)
