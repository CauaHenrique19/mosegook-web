import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../context/context'
import MenuAdmin from '../../../Components/MenuAdmin'
import ModalForm from '../../../Components/ModalForm'
import Loading from '../../../Components/Loading'
import api from '../../../services/api'
import './books.css'

const Books = () => {

    const { viewModalForm, setViewModalForm } = useContext(Context)
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const categorySeriesId = 3
        api(`/medias/${categorySeriesId}`)
            .then(res => {
                setBooks(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))
    }, [])

    return (
        <div className="books-container">
            { loading && <Loading /> }
            { viewModalForm && <ModalForm page="Livros" /> }
            <MenuAdmin page="books" />
            <div className="main-books-container">
                <div className="statistics-books-main-container">
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{books.length}</h1>
                            <h2 className="statistic-description">Livros</h2>
                        </div>
                        <div>
                            <ion-icon name="book-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">378</h1>
                            <h2 className="statistic-description">Avaliações</h2>
                        </div>
                        <div>
                            <ion-icon name="chatbox-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">49</h1>
                            <h2 className="statistic-description">1984</h2>
                        </div>
                        <div>
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="books-main-container">
                    <div className="header-books-main-container">
                        <h1>Livros</h1>
                        <div>
                            <div className="input-container">
                                <input type="text" placeholder="Pesquisar" />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <button>
                                <ion-icon name="add-outline"></ion-icon>
                                Novo Livro
                            </button>
                        </div>
                    </div>
                    <div className="books">
                        {
                            books && books.map(book => (
                                <div key={book.id} className="book">
                                    <div className="book-image-container">
                                        <img src={book.url_poster} alt="" />
                                    </div>
                                    <div className="book-info-container">
                                        <h2>{book.name}</h2>
                                        <button onClick={() => setViewModalForm(!viewModalForm)}><ion-icon name="trash-outline"></ion-icon></button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Books