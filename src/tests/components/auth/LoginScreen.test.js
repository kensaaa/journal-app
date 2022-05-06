import React from 'react'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import {Provider} from 'react-redux'
//me ayuda a fingir las rutas
import { MemoryRouter } from 'react-router-dom'

import LoginScreen from "../../../components/auth/LoginScreen"
import {startGoogleLogin, startLoginEmailPassword} from '../../../actions/auth'

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState ={ 
    auth:{},
    ui: {
        loading: false,
        msg:null,
    },
}

let store = mockStore( initState )
//control absoluto con que se llamo dispatch
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>  
            <LoginScreen />
        </MemoryRouter>
    </Provider>
)

describe('Prueba en <LoginScreen />', () => {

    beforeEach(() =>{
        store = mockStore(initState)
        jest.clearAllMocks()
    })

    test('debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    test('debe de disparar la accion de startLoginScreen', () => {
        wrapper.find('.google-btn').prop('onClick')()

        expect( startGoogleLogin ).toHaveBeenCalled()

    })

    test('debe de disparar el startLogin con los  respectivos argumentos', () => {
        wrapper.find('form').prop('onSubmit')(
            { preventDefault(){} }
        )

        expect( startLoginEmailPassword ).toHaveBeenCalledWith('kensa@gmail.com','123456')
    })


})
