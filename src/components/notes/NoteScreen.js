import React from 'react'
import NoteAppBar from './NoteAppBar'

const NoteScreen = () => {

    return (
        <div className='notes__main-content'>

            <NoteAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                />

                <textarea
                    placeholder='what happened today'
                    className='notes__text-area'
                    autoComplete='off'
                >
                </textarea>


                <div className="notes__image">
                    <img 
                        src="https://fondosmil.com/fondo/17010.jpg" 
                        alt="imagen" 
                    />

                </div>

            </div>


        </div>
    )
}

export default NoteScreen
