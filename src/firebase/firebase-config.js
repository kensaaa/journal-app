//importamos todo firebase
import firebase from 'firebase/app'
//para expandir ese paquete
import 'firebase/firestore'
import 'firebase/auth'


//configuracion que me entrega firebase
const firebaseConfig = {
  apiKey: "AIzaSyCY-2njFWymb6obbZYssFOtPsUXmckRs1I",
  authDomain: "react-app-curso-95612.firebaseapp.com",
  projectId: "react-app-curso-95612",
  storageBucket: "react-app-curso-95612.appspot.com",
  messagingSenderId: "651231422623",
  appId: "1:651231422623:web:d7c8eca5563811cccd9aaa"
};
firebase.initializeApp(firebaseConfig);


//esta es la base de datos
const db = firebase.firestore()
//esto es para que pueda hacer atentificacion con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()


export {
    db,
    googleAuthProvider,
    firebase,
}
