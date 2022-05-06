import React from 'react'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import {types} from '../../../types/types'
import JournalEntry from '../../../components/journal/JournalEntry'
import {activeNote} from '../../../actions/notes'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState ={ 
}

let store = mockStore( initState )
store.dispatch = jest.fn()

const note = {
    id:10,
    date:0,
    title:'hola',
    body:'mundo',
    url:'https://algun-lugar.com/foto.jpg'
}

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <JournalEntry { ...note }/>
        </MemoryRouter>
    </Provider>

)
describe('Prueba en <JournalEntry />', () => {

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe activar la nota', () => {
        wrapper.find('.journal__entry').prop('onClick')()

        //estoy evaluando el store con que argumento fue llamado
        expect( store.dispatch ).toHaveBeenCalledWith(
            //esto devuelve el resultado de la accion de actve note
            activeNote(note.id, { ...note })
        )
        
    })

})
