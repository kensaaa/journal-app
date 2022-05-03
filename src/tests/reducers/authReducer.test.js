import {authReducer} from "../../reducers/authReducer"
import {types} from "../../types/types"

describe('Prueba en authReducer', () => {

    test('debe de realizar el login ', () => {
        
        const initState = {

        }

        const action = {
            type: types.login,
            payload:{
                uid: 'abc',
                displayName:'kevin'
            }
        }

        const state = authReducer( initState, action  )
        expect(state).toEqual({
            uid: 'abc',
            name: 'kevin'
        })

    })

    test('debe de realizar el logout', () => {
        
        const initState = {
            uid:'tonehuntoe',
            name:'kenthnt'
        }

        const action = {
            type: types.logout,
        }

        const state = authReducer( initState, action  )
        expect(state).toEqual({})

    })


    test('si no existe el type, que regrese el mismo state inicial', () => {
        
        const initState = {
            uid:'tonehuntoe',
            name:'kenthnt'
        }

        const action = {
            type: 'toenhunta',
        }

        const state = authReducer( initState, action  )
        expect(state).toEqual(initState)

    })


})
