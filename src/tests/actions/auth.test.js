import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import {login, logout, startLoginEmailPassword, startLogout} from "../../actions/auth"
import {types} from "../../types/types"

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}

let store = mockStore( initState )

describe('Prueba con las actiones de auth', () => {

    beforeEach(() =>{
        store = mockStore(initState)
    })

    test('login y logout deben de crear la accion respectiva', () => {

        const uid = 'ABC123'
        const displayName = 'kevin'

        const loginAction = login(uid,displayName)
        const logoutAction = logout()

        expect( loginAction ).toEqual({
            type: types.login,
            payload:{
                uid,
                displayName
            }
        })

        expect( logoutAction ).toEqual({ type: types.logout })

    })

    //action startLougout
    test('debe de realizar el logout ', async() => {
        await store.dispatch( startLogout() )

        const actions = store.getActions()

        expect( actions[0] ).toEqual({
            type: types.logout
        })

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning 
        })
    })

    //
    test('debe de iniciar el startLoginEmailPassword', async() => {
        //el email  y password lo puede crar manualmente en firebsae, con el metodo de correo y contrasena
        await store.dispatch(startLoginEmailPassword('test@testing.com','123456'))

        //hacemos un cambio en
        const actions = store.getActions()

        expect(actions[2]).toEqual({
            type: types.login,
            payload:{
                uid:'qBnYXh16oOMuSUvnRL6yQivyIpk2' ,
                displayName:null
            }
        })


    })


})
