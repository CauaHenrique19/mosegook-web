import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/context'
import api from '../../services/api'
import './style.css'

const Opinion = () => {

    const { user } = useContext(Context)
    const [content, setContenxt] = useState('')
    const [viewModal, setViewModal] = useState(false)

    function handleSubmit(){
        const opinion = { user_id: user.id, content }

        api.post('/opinions', opinion)
            .then(res => {
                if(!res.data.message){
                    setViewModal(true)
                    console.log(res.data)
                }
            })
            .catch(error => console.error(error.message))
    }

    return (
        <div className="opinion-container">
            {
                viewModal && 
                <div className="modal-container">
                    <div className="modal-content">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        <h1>Enviado com sucesso!</h1>
                        <Link to="/timeline">Voltar para timeline</Link>
                    </div>
                </div>
            }
            <header className="opinion-header-container">
                <h1>Mosegook</h1>
            </header>
            <div className="main-opinion-container">
                <div className="form-opinion-container">
                    <h1>Descreva sua experiência</h1>
                    <textarea value={content} onChange={e => setContenxt(e.target.value)} placeholder="Seu Texto" cols="30" rows="10"></textarea>
                    <button onClick={() => handleSubmit()} >Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Opinion