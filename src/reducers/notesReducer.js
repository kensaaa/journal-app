/*
 {
    notes: [],
    active: null, (cuando no tenga una nota seleccionada)
    active: {
        id: 'uhatoehuntaoehn',
        title: '',
        body:'',
        imageUrl:'',
        date:23165465
    }

 }
 */

import {types} from "../types/types"

const initialState ={
    notes:[],
    active:null,
}



export const notesReducer = ( state = initialState,action) => {
    switch (action.type) {

         case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesAddNew:
            return {
                ...state,
                notes: [ ...state.notes, action.payload ]
            }



        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note 
                        : note
                )
            }

        case types.notesDelete:
            return{
                ...state,
                active:null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        case types.notesLogoutCleaning:
            return {
                ...state,//esto solo si tengo mas cosas ( pero puedo sacarlo y funciona igual )
                notes:[],
                active:null
            }


        default:
            return state
    }
}
