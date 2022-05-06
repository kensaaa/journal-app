import React from 'react'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import {types} from '../../../types/types'
import NoteScreen from '../../../components/notes/NoteScreen'
import {activeNote} from '../../../actions/notes'

activeNote
jest.mock('../../../actions/notes',() => ({
    activeNote: jest.fn(),
}))


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState ={ 
    auth:{
        user:{
            uid:'ABC123',
            displayName:'juan'
        }
    },
    ui: {
        loading: false,
        msgError:null,
    },
    notes:{
        active:{
            id:1234,
            title:'hola',
            body:'mundo',
            date:0
        },
        notes:[]
    }
}

let store = mockStore( initState )
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <NoteScreen />
        </MemoryRouter>
    </Provider>

)

describe('Prueba en <NoteScreen />', () => {

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })


    test('debe de disparar el active note', () => {

        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name:'title',
                value:'hola de nuevo'
            }
        })

        //esto se ejecuta 2 veces porque activeNote esta dentro de un efecto, y la
        //primera vez no me importa por eso llamo al toHaveBeenLastCalledWith
        expect(activeNote).toHaveBeenLastCalledWith(
            1234,
            {
                body:'mundo',
                title: 'hola de nuevo',
                id:1234,
                date:0
            }
        )
        
    })
})
