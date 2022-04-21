import React from 'react'
//cumple la misma funcio que provider del context (promueve informacion)
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import {store} from './store/store'

const JournalApp = () => {

    //Proveer informacion del store a la app

    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}

export default JournalApp
