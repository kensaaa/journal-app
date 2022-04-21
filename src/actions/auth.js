import Swal from 'sweetalert2'
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import {types} from "../types/types"
import {finishLoading, startLoading} from './ui'

export const startLoginEmailPassword = (email,password) => {

    return (dispatch) => {
        dispatch( startLoading() )
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({user}) => {

                dispatch( finishLoading() )
                dispatch( login(user.uid,user.displayName) )
            })
            .catch(e => {
                dispatch( finishLoading() )
                Swal.fire('Error',e.message,'error')
            })

    }
}

export const startGoogleLogin = () => {

    return (dispatch) => {

        //el signInWithPopup nesecita un provider que lo configuramos en firebase-config
        firebase.auth().signInWithPopup(googleAuthProvider)
            //cualdo se resuelve la promesa me entrega un userCred con varias cosas interesantes pero,
            // solo me importa la informcion del user que esta dentro del userCred
            .then( ({ user }) => {
                console.log(user)
                dispatch( login(user.uid, user.displayName) )
            })

    }

}

//es una tarea asincrona
export const registerWithEmailPasswordName = (email,password,name) => {

    return ( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
        //esto resueve un userCredential  lo mismo que con google
            .then( async ({ user }) => {

                //actualizamos al user, para colocar su nombre (tambien se puede la fotografia)
                //regresa una promesa( para no tener tantas promesas en cadena usamos async )
                await user.updateProfile({
                    displayName: name,
                })

                dispatch( login(user.uid, user.displayName) )
            })
        //existe error lo imprimo por consola
            .catch(e => {
                Swal.fire('Error', e.message, 'error')
            })

    }

}




export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    }
})


//esteo es asincrono por eso callback
//esto action saca el usuario en firebase
export const startLogout = () => {
    return async (dispatch) => {
        //regresa una promesa
        await firebase.auth().signOut()

        dispatch( logout() )
    }
}


//esta action saca el usuario del store

export const logout = () => ({
    type: types.logout,
})
