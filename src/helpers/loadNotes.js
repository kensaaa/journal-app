import {db} from "../firebase/firebase-config"

export const loadNotes = async (uid) => {

    //es path lo saque de firestore
    const notesSnap = await db.collection(`${uid}/journal/notes`).get()
    const notes  = []

    //con esto obtenemos las notas
    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    return notes
}


