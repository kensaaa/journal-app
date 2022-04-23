import Swal from "sweetalert2"
import {db} from "../firebase/firebase-config"
import {fileUpload} from "../helpers/fileUpload"
import {loadNotes} from "../helpers/loadNotes"
import {types} from "../types/types"


//es una tarea asincrona por eso el return de un callback
//
//cosas necesarias para grabar en firestore:
//
// uid del user ( para obtenerlo vamos usar el segundo argumento de callback getState, que obtiene el state )
//
//
export const startNewNote = () => {

    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote )

        //queremos que la  nota se active cuando se cree
        dispatch ( activeNote(doc.uid, newNote) )
        dispatch ( addNewNote(doc.id, newNote) )
        
    }

}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})


export const addNewNote = (id,note) => ({
    type:types.notesAddNew,
    payload: {
        id,...note
    }
})


export const startLoadingNotes =  ( uid ) => {
    return async(dispatch) => {
        //cargamos las notas
        const notes = await loadNotes( uid )
        dispatch( setNotes( notes ) )
    }
}


export const setNotes = (notes) => ( {
    type: types.notesLoad,
    payload: notes 
})

//tarea asincrona , trabajamos con el midware thunk
export const startSaveNote = (note) => {
    return async(dispatch,getState) => {

        const { uid } = getState().auth

        if (!note.url){
            delete note.url
        }


        const noteToFirestore = { ...note }
        delete noteToFirestore.id

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)


        dispatch( refreshNote(note.id,noteToFirestore) )
        Swal.fire('saved',note.title,'success')
    }
}




//necesitamos el id de la nota y la nota, ( se pone el id por separado porque no siempre voy a tener el id de la nota )
//esta accion solo actualiza una nota
export const refreshNote = (id,note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        //solucionar el problema del key
        note: {
            id,
            ...note
        }
    }
})



export const startUploading = (file) => {

    return async(dispatch,getState) => {

        //obtenemos la nota activa actual
        const { active:activeNote }  = getState().notes

        Swal.fire({
            title:'Uploading...',
            text:'Please wait...',
            //para sacar el botton de confirmacion
            showConfirmButton:false,
            //para no cancelar si hago click fuera del recuadro blanco
            allowOutsideClick:false,
            //esto ejecuta
            //un louding que no se pueda cerrar
            willOpen: () => {
                Swal.showLoading()
            }
        })

        const fileUrl = await fileUpload(file)
        activeNote.url = fileUrl

        //se guarda la imagen con la url 
        dispatch( startSaveNote( activeNote ) )


        //quitamos el para quitar el louding
        Swal.close()
    }
}


export const startDeleting = (id) => {

    return async(dispatch,getState) => {

        const uid = getState().auth.uid

        //lo borra de la base de datos
        await db.doc(`${uid}/journal/notes/${id}`).delete()
        //borrar fisicamente de nuestro listado y store
        dispatch( deleteNode(id) )

    }
}


export const deleteNode = (id) => ({
    type: types.notesDelete,
    payload: id
})


export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})





