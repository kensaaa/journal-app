import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import JournalScreen from "../components/journal/JournalScreen";
import AuthRouter from "./AuthRouter";
import {login} from "../actions/auth";
import { firebase } from '../firebase/firebase-config'
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {

    const dispatch = useDispatch()

    //mientras esto sea true no voy a mostrar nada de mi app
    const [ checking, setChecking ] = useState(true)

    //comtrolar si esta logeado (al inicio es falso)
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    useEffect( () => {
        firebase.auth().onAuthStateChanged( (user) => {

            if (user?.uid){
                dispatch( login(user.uid, user.displayName) )
                //se loggeo de manera correcta
                setIsLoggedIn(true)
            }else{
                //no se loggeo
                setIsLoggedIn(false)
            }

            //con esto digo que termine el chequeo, y ya tengo la respuesta de firebase
            setChecking(false)

        })

    },[dispatch,setChecking,setIsLoggedIn])


    //muestra espere.. hasta que checking cambie a false
    //si quiero puedo agregar un componente personalizado
    if (checking) {
        return (
            <h1>Espere....</h1>
        )
    }


    return (
        <Router>
            <div>
                <Switch >
                    <PublicRoute path='/auth' component={ AuthRouter } isAuthenticated={ isLoggedIn }/>
                    <PrivateRoute exact path='/' component={ JournalScreen } isAuthenticated={ isLoggedIn }/>
                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
