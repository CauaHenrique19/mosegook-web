import React from 'react'
import './style.css'

const Opinion = () => {
    return (
        <div className="opinion-container">
            <header className="opinion-container">
                <h1>Mosegook</h1>
            </header>
            <div className="main-opinion-container">
                <div className="form-opinion-container">
                    <h1>Descreva sua experiência</h1>
                    <textarea placeholder="Seu Texto" cols="30" rows="10"></textarea>
                    <button>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Opinion