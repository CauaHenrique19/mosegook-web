import React, { useContext } from 'react'
import { Context } from '../../context/context'
import './modalForm.css'

const ModalForm = ({ page }) => {

    const { viewModalForm, setViewModalForm } = useContext(Context)

    const forms = {
        category: '<h1>Oi</h1>'
    }

    return (
        <div className="modal-form-container">
            <div className="content-modal-form-container">
                <div className="header-modal-form">
                    <h1>{page}</h1>
                    <button onClick={() => setViewModalForm(!viewModalForm)}><ion-icon name="close-outline"></ion-icon></button>
                </div>
                <div dangerouslySetInnerHTML={{ __html: forms['category'] }}>

                </div>
            </div>
        </div>
    )
}

export default ModalForm