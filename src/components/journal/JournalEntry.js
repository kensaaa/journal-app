import React from 'react'

const JournalEntry = () => {

    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize:'cover',
                    backgroundImage: 'url(https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/e/6/1/4/e6141ec5304b260dd0507ac9aea8288b.jpg)',
                    backgroundPosition:'center'
                }}
            ></div>

            <div className="journal__entry-body">
                <p 
                    className="journal__entry-title"
                >
                    Un nuevo dia
                </p>

                <p 
                    className="journal__entry-content"
                >
                    Elit accusantium nisi ipsam accusamus ut unde! Expedita
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4> 28 </h4>
            </div>
        </div>
    )
}

export default JournalEntry
