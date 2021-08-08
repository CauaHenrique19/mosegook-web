import React from 'react'
import { Link } from 'react-router-dom'
import './menuAdmin.css'

const MenuAdmin = ({ page }) => {
    return (
        <div className="menu-container">
            <div className="logo-container">
                <Link to="/"><h1>Mosegook</h1></Link>
            </div>
            <ul>
                <Link to="/admin/movies" className={page === "movies" ? "menu-item selected" : "menu-item"}>
                    <ion-icon name="film-outline"></ion-icon>
                    <h2>Filmes</h2>
                </Link>
                <Link to="/admin/series" className={page === "series" ? "menu-item selected" : "menu-item"}>
                    <ion-icon name="videocam-outline"></ion-icon>
                    <h2>Séries</h2>
                </Link>
                <Link to="/admin/books" className={page === "books" ? "menu-item selected" : "menu-item"}>
                    <ion-icon name="book-outline"></ion-icon>
                    <h2>Livros</h2>
                </Link>
                <Link to="/admin/games" className={page === "games" ? "menu-item selected" : "menu-item"}>
                    <ion-icon name="game-controller-outline"></ion-icon>
                    <h2>Jogos</h2>
                </Link>
                <Link to="/admin/categories" className={page === "categories" ? "menu-item selected" : "menu-item"}>
                    <ion-icon name="pricetag-outline"></ion-icon>
                    <h2>Categorias</h2>
                </Link>
                <Link to="/admin/genders" className={page === "genders" ? "menu-item selected" : "menu-item"}>
                    <ion-icon name="bookmark-outline"></ion-icon>
                    <h2>Gêneros</h2>
                </Link>
                <Link to="/admin/users" className={page === "users" ? "menu-item selected" : "menu-item"}>
                    <ion-icon name="person-outline"></ion-icon>
                    <h2>Usuários</h2>
                </Link>
                <Link to="/admin/suggestions"  className={page === "suggestions" ? "menu-item selected" : "menu-item"}>
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