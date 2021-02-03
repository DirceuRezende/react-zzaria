import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCQwM7pmSN8sVeGRtdEeLb_6miKxaHRQKA',
  authDomain: 'reactzzaria-f7f87.firebaseapp.com',
  projectId: 'reactzzaria-f7f87',
  storageBucket: 'reactzzaria-f7f87.appspot.com',
  messagingSenderId: '868530884207',
  appId: '1:868530884207:web:eae04c5a8851804f43c79a',
  measurementId: 'G-5XRMY3R3CC'
}

firebase.initializeApp(firebaseConfig)

export default firebase
