import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {activeNote, startDeleting} from '../../actions/notes'
import {useForm} from '../../hooks/useForm'
import NoteAppBar from './NoteAppBar'

const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active:note } = useSelector(state => state.notes)
    const [ formValues, handleInputChange, reset ] = useForm(note)
    const { body,title } = formValues

    const activeId =useRef(note.id)


    useEffect( () => {
        
        if  (note.id !== activeId.current ){
            reset( note )
            activeId.current = note.id
        }


    },[note,reset])

    //actualizar nota en store
    useEffect( () => {
        dispatch( activeNote(formValues.id, {...formValues}) )
    },[formValues,dispatch])

    const handleDelete = () => {
        dispatch( startDeleting(note.id) )
    }

    return (
        <div className='notes__main-content'>

            <NoteAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    name='title'
                    value={ title }
                    onChange= {handleInputChange}
                    
                />

                <textarea
                    placeholder='what happened today'
                    className='notes__text-area'
                    autoComplete='off'
                    value= { body }
                    onChange= {handleInputChange}
                    name= 'body'
                >
                </textarea>


                {
                    //con esta sintaxis se me cambian las 2 imagenes a la vez
                     ( note.url )
                     &&(
                            <div className="notes__image">
                                <img 
                                    src={ note.url } 
                                    alt="imagen" 
                                />

                            </div>
                        )
                }

            </div>

            <button 
                className='btn btn-danger'
                onClick= { handleDelete }
            >
                delete
            </button>


        </div>
    )
}

export default NoteScreen
