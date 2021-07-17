import React from 'react'
import { Link } from 'react-router-dom'
import './coment.css'

const Coment = ({ coment }) => {
    return (
        <div key={coment.id} className="coment">
            <div className="header-coment">
                <div className="info-user">
                    <ion-icon style={{ color: coment.category_color }} name="chatbox"></ion-icon>
                    <div className="user-info">
                        <h3>{coment.user_name}</h3>
                        <p>@{coment.user_user}</p>
                    </div>
                </div>
                <div className="info-post">
                    <p style={{ backgroundColor: coment.category_color }}>{coment.created_at}</p>
                </div>
            </div>
            <div className="content-coment">{coment.content}</div>
            <div className="footer-coment">
                <div className="info-media">
                    <div style={{ backgroundColor: coment.category_color }} className="color-coment">
                        <ion-icon name={coment.category_icon}></ion-icon>
                    </div>
                    <div className="info-footer">
                        <h3>Sobre</h3>
                        <p>{coment.media_name}</p>
                    </div>
                </div>
                <div className="info-coment">
                    <div style={{ backgroundColor: coment.category_color }} className="amount-coments">
                        <ion-icon name="chatbubble"></ion-icon>
                        <p>0</p>
                    </div>
                    <div style={{ backgroundColor: coment.category_color }} className="amount-likes">
                        <ion-icon name="heart"></ion-icon>
                        <p>0</p>
                    </div>
                </div>
            </div>
            <div className="links-coment-container">
                <button><ion-icon name="heart-outline"></ion-icon></button>
                <Link><ion-icon name="add-outline"></ion-icon></Link>
            </div>
        </div>
    )
}

export default Coment