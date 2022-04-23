import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {startSaveNote, startUploading} from '../../actions/notes'

const NoteAppBar = () => {

    const dispatch = useDispatch()
    const { active:note } = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch( startSaveNote( note ) )	
    }

    const handlePictureClick = () => {
        //que busque el input y simule el click
        document.querySelector('#fileSelector').click()
    }

    //es igual que los inputs
    const handleFileChange = (e) => {
        //las imagenes se encuentran en e.target.files, ahi se encuentran todas las imagenes seleccionada
        //el user cancela el largo es de 0
        // console.log(e.target.files)
        
        const file = e.target.files[0]
        //si tenemos un file
        if (file){
            dispatch( startUploading( file ) )
        }
        
    }

    return (
        <div className='notes__appbar'>
            <span>28 agosto de 2020 </span>

            <input 
                id='fileSelector'
                type="file" 
                style={{
                    //para ocultarlo
                    display: 'none'
                }}
                //cuando cambia
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick= { handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default NoteAppBar
