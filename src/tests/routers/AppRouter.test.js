import React from 'react'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import AppRouter from '../../routers/AppRouter'
import {login} from '../../actions/auth'
import { act } from 'react-dom/test-utils'
import { firebase } from '../../firebase/firebase-config'


jest.mock('../../actions/auth',() => ( {
    login: jest.fn()
} ))


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState ={ 
    auth:{},
    ui: {
        loading: false,
        msg:null,
    },
    notes:{
        active:{
            id:'ABC',
        },
        notes:[]

    }
}

let store = mockStore( initState )
store.dispatch = jest.fn()

describe('Prueba en <App Router/>', () => {

    test('debe de llamar al login si estoy autentificado ', async() => {

        let user;

        //esto es una recomendacion de react el await al act
        await act(async () => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com','123456')
            user = userCred.user

            const wrapper = mount(
                <Provider store={ store }>
                    <MemoryRouter>  
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        })

        expect(login).toHaveBeenCalledWith('qBnYXh16oOMuSUvnRL6yQivyIpk2',null)
        
    })
})
