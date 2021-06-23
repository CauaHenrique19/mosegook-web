import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../context/context'
import MenuAdmin from '../../../Components/MenuAdmin'
import ModalForm from '../../../Components/ModalForm'
import Loading from '../../../Components/Loading'
import api from '../../../services/api'
import './games.css'

const Games = () => {

    const { viewModalForm, setViewModalForm } = useContext(Context)
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const categorySeriesId = 2
        api(`/medias/${categorySeriesId}`)
            .then(res => {
                setGames(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))
    }, [])

    return (
        <div className="games-container">
            { loading && <Loading /> }
            { viewModalForm && <ModalForm page="games" /> }
            <MenuAdmin page="games" />
            <div className="main-games-container">
                <div className="statistics-games-main-container">
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{games.length}</h1>
                            <h2 className="statistic-description">Jogos</h2>
                        </div>
                        <div>
                            <ion-icon name="game-controller-outline"></ion-icon>
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
                            <h2 className="statistic-description">League Of Legends</h2>
                        </div>
                        <div>
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="games-main-container">
                    <div className="header-games-main-container">
                        <h1>Jogos</h1>
                        <div>
                            <div className="input-container">
                                <input type="text" placeholder="Pesquisar" />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <button>
                                <ion-icon name="add-outline"></ion-icon>
                                Novo Jogo
                            </button>
                        </div>
                    </div>
                    <div className="games">
                        {
                            games && games.map(game => (
                                <div key={game.id} className="game">
                                    <div className="game-image-container">
                                        <img src={game.url_poster} alt="" />
                                    </div>
                                    <div className="game-info-container">
                                        <h2>{game.name}</h2>
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

export default Games