import React from 'react'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import {types} from '../../../types/types'
import Sidebar from '../../../components/journal/Sidebar'
import {startLogout} from '../../../actions/auth'
import {startNewNote} from '../../../actions/notes'

jest.mock('../../../actions/auth',() => ({
    startLogout: jest.fn(),
}))

jest.mock('../../../actions/notes',() => ({
    startNewNote: jest.fn(),
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
        active:null,
        notes:[]
    }
}

let store = mockStore( initState )
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider>

)

describe('Prueba en <SideBar />', () => {

    test('debe de mostrarse correctamente ', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    test('debe de llamar el startLogout', () => {
        wrapper.find('button').simulate('click')
        expect(startLogout).toHaveBeenCalled()
    })

    test('debe de llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').simulate('click')
        expect(startNewNote).toHaveBeenCalled()
    })
})
