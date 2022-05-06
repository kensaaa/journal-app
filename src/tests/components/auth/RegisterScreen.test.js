import React from 'react'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import RegisterScreen from '../../../components/auth/RegisterScreen'
import {types} from '../../../types/types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState ={ 
    auth:{},
    ui: {
        loading: false,
        msgError:null,
    },
}

let store = mockStore( initState )

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>

)

describe('Prueba en <RegisterScreen/>', () => {

    test('debe  mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    test('debe de hacer el dispatch de la accion respectiva', () => {
        const emailField = wrapper.find('input[name="email"]')
        emailField.simulate('change',{
            target:{
                value:'',
                name:'email'
            }
        })

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        })

        //esto es sincrono
        const actions = store.getActions()
        
        expect( actions[0] ).toEqual({
            type:types.uiSetError,
            payload: 'email is required'
        })

    })

    test('debe de mostrar la caja de alerta con el error', () => {
        const initState ={ 
            auth:{},
            ui: {
                loading: false,
                msgError:'email is required',
            },
        }

        //esto es importante si mando una accion no va a cambiar el store, solo es un mock
        let store = mockStore( initState )

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>

        )       

        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true)
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe(initState.ui.msgError)


    })

})
