import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import MenuAdmin from '../../../Components/MenuAdmin'
import ModalForm from '../../../Components/ModalForm'
import Loading from '../../../Components/Loading'
import api from '../../../services/api'
import './movies.css'

const Movies = () => {

    const { viewModalForm, setViewModalForm } = useContext(Context)
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const categoryMoviesId = 1
        api(`/medias/${categoryMoviesId}`)
            .then(res => {
                setMovies(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))
    }, [])
    
    return (
        <div className="movies-container">
            { loading && <Loading /> }
            { viewModalForm && <ModalForm page="Filmes" /> }
            <MenuAdmin page="movies" />
            <div className="main-movies-container">
                <div className="statistics-movies-main-container">
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{movies.length}</h1>
                            <h2 className="statistic-description">Filmes</h2>
                        </div>
                        <div>
                            <ion-icon name="film-outline"></ion-icon>
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
                            <h2 className="statistic-description">Vingadores End Game</h2>
                        </div>
                        <div>
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="movies-main-container">
                    <div className="header-movies-main-container">
                        <h1>Filmes</h1>
                        <div>
                            <div className="input-container">
                                <input type="text" placeholder="Pesquisar" />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <button>
                                <ion-icon name="add-outline"></ion-icon>
                                Novo filme
                            </button>
                        </div>
                    </div>
                    <div className="movies">
                        {
                            movies && movies.map(movie => (
                                <div key={movie.id} className="movie">
                                    <div className="movie-image-container">
                                        <img src={movie.url_poster} alt="" />
                                    </div>
                                    <div className="movie-info-container">
                                        <h2>{movie.name}</h2>
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

export default Movies