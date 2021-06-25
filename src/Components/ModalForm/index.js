import React, { useContext } from 'react'
import { Context } from '../../context/context'
import './modalForm.css'

const ModalForm = ({ page, type }) => {

    const { viewModalForm, setViewModalForm } = useContext(Context)

    return (
        <div className="modal-form-container">
            <div className={`content-modal-form-container ${type}`}>
                <div className="header-modal-form">
                    <h1>{page}</h1>
                    <button onClick={() => setViewModalForm(!viewModalForm)}><ion-icon name="close-outline"></ion-icon></button>
                </div>
                <div className={`main-modal-form ${type}`}>
                    {
                        type === "confirm" && 
                        <div className="confirm-container">
                            <h2>Tem certeza que deseja excluir?</h2>
                            <div>
                                <button>Remover</button>
                                <button onClick={() => setViewModalForm(false)}>Cancelar</button>
                            </div>
                        </div>
                    }
                    {
                        type === "form-gender" &&
                        <div className="form-gender-container">
                            <div className="row-form">
                                <div className="input-container">
                                    <label htmlFor="name">Nome</label>
                                    <input type="text" id="name" />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="color">Cor</label>
                                    <input type="color" id="color" />
                                </div>
                            </div>
                            <div className="buttons-container">
                                <button>Editar</button>
                                <button onClick={() => setViewModalForm(false)}>Canelar</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalForm