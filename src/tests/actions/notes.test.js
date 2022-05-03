import configureStore from 'redux-mock-store' //ES6 modules
//nos ayuda con tarea asincronas
import thunk from 'redux-thunk'
import {startNewNote} from '../../actions/notes'
import {db} from '../../firebase/firebase-config'
import {types} from '../../types/types'

const middlewares = [thunk]
//funcion que crea el store
const mockStore = configureStore(middlewares)

//lo que enviemos sera lo que tendra el store
const store = mockStore({
    auth:{
        uid:'TESTING',
    },

})

describe('Prueba con las actions de notes', () => {

    test('debe de crearuna nueva nota startNewNote', async () => {

        await store.dispatch( startNewNote() )
        //cuando se ejecute esta accion estamos esperando que se ejecuten otras aciones
        // el await es importate 
        //
        //
        // no da un arreglo con las acciones que se dispararon
        const actions = store.getActions()

        // console.log(actions)
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


        //al igual que las imagenes va crear un registro cada vez que ejecuto la prueba
        // la eliminamos

        const docId = actions[0].payload.id
        await db.doc(`/TESTING/journal/notes/${docId}`).delete()

        
    })
})
