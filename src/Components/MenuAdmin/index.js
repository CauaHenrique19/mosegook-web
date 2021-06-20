import React from 'react'
import { Link } from 'react-router-dom'
import './menuAdmin.css'

const MenuAdmin = () => {
    return (
        <div className="menu-container">
            <div className="logo-container">
                <h1>Mosegook</h1>
            </div>
            <ul>
                <Link to="" className="menu-item selected">
                    <ion-icon name="film-outline"></ion-icon>
                    <h2>Filmes</h2>
                </Link>
                <Link to="" className="menu-item">
                    <ion-icon name="videocam-outline"></ion-icon>
                    <h2>Séries</h2>
                </Link>
                <Link to="" className="menu-item">
                    <ion-icon name="book-outline"></ion-icon>
                    <h2>Livros</h2>
                </Link>
                <Link to="" className="menu-item">
                    <ion-icon name="game-controller-outline"></ion-icon>
                    <h2>Jogos</h2>
                </Link>
                <Link to="" className="menu-item">
                    <ion-icon name="chatbox-outline"></ion-icon>
                    <h2>Avaliações</h2>
                </Link>
                <Link to="" className="menu-item">
                    <ion-icon name="alert-circle-outline"></ion-icon>
                    <h2>Sugestões</h2>
                </Link>
                <Link to="" className="menu-item">
                    <ion-icon name="happy-outline"></ion-icon>
                    <h2>Opiniões</h2>
                </Link>
            </ul>
        </div>
    )
}

export default MenuAdmin