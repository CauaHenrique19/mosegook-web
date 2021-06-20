import React, { useContext } from 'react'
import { Context } from '../../context/context'
import './modalForm.css'

const ModalForm = () => {

    const { viewModalForm, setViewModalForm } = useContext(Context)

    return (
        <div className="modal-form-container">
            <div className="content-modal-form-container">
                <div className="header-modal-form">
                    <h1>Filmes</h1>
                    <button onClick={() => setViewModalForm(!viewModalForm)}><ion-icon name="close-outline"></ion-icon></button>
                </div>
            </div>
        </div>
    )
}

export default ModalForm