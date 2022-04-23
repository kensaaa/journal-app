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
import { startLoadingNotes} from "../actions/notes";

const AppRouter = () => {

    const dispatch = useDispatch()

    //mientras esto sea true no voy a mostrar nada de mi app
    const [ checking, setChecking ] = useState(true)

    //comtrolar si esta logeado (al inicio es falso)
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    useEffect( () => {
        firebase.auth().onAuthStateChanged(  (user) => {

            if (user?.uid){
                dispatch( login(user.uid, user.displayName) )
                setIsLoggedIn(true)
                dispatch( startLoadingNotes( user.uid ) )


            }else{
                setIsLoggedIn(false)
            }

            setChecking(false)

        })

    },[dispatch,setChecking,setIsLoggedIn])


    if (checking) {
        return (
            <h1>Wait....</h1>
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
