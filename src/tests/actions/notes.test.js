 /** * @jest-environment node */ 
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import {startNewNote, startLoadingNotes, startSaveNote } from '../../actions/notes'
import {db} from '../../firebase/firebase-config'
import {types} from '../../types/types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState ={
    auth:{
        uid:'TESTING',
    },
    notes:{
        active:{
            id: 'PeNtD4bEzz5pMZMF3Scx',
            title:'hola',
            body:'mundo',
        }
    }
}

let store = mockStore( initState )

describe('Prueba con las actions de notes', () => {

    beforeEach(() =>{
        store = mockStore(initState)
    })


    test('debe de crearuna nueva nota startNewNote', async () => {

        await store.dispatch( startNewNote() )
        const actions = store.getActions()

        expect( actions[0] ).toEqual({
            type:types.notesActive,
            payload:{
                 id: expect.any(String),
                 title: '',
                 body: '',
                 date: expect.any(Number) 
            }
        })

        expect( actions[1] ).toEqual({
            type:types.notesAddNew,
            payload:{
                 id: expect.any(String),
                 title: '',
                 body: '',
                 date: expect.any(Number) 
            }
        })

        const docId = actions[0].payload.id
        await db.doc(`/TESTING/journal/notes/${docId}`).delete()

        
    })

    test('startLoadingNotes debe cargar las notas', async() => {
        await store.dispatch( startLoadingNotes('TESTING') )
        
        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload:expect.any(Array)
        })
        
        const expeted = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[0].payload[0] ).toEqual(expeted)

    })


    test('startSaveNote debe de actualizar la nota', async() => {

        const note = {
            id: 'PeNtD4bEzz5pMZMF3Scx',
            title:'titulo',
            body:'body'
        }

        await store.dispatch( startSaveNote(note) )
        const actions = store.getActions()

        expect(actions[0].type).toBe(types.notesUpdated)

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get()

        expect( docRef.data().title ).toBe( note.title )
        
    })


})






