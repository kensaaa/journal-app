//nota no funciona si tengo  jest environment node import configureStore from 'redux-mock-store' //ES6 modules
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import {startUploading} from '../../actions/notes'
import {fileUpload} from '../../helpers/fileUpload'

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg'
    })
}))

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




describe('Prueba en notes action', () => {

    beforeEach(() =>{
        store = mockStore(initState)
    })

    test('startUploading debe de actualizar el url del entry', async() => {

        //un archivo vacio
        const file = new File([],'foto.jpg');

        await store.dispatch( startUploading( file ) )
        //esto me da un error de scroll que no existe en consola, solcucion en septupTest
        
    })
})
