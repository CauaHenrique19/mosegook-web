import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../../context/context'
import MenuAdmin from '../../../Components/MenuAdmin'
import ModalForm from '../../../Components/ModalForm'
import Loading from '../../../Components/Loading'
import api from '../../../services/api'
import './series.css'

const Series = () => {

    const { viewModalForm, setViewModalForm } = useContext(Context)
    const [series, setSeries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const categorySeriesId = 4
        api(`/medias/${categorySeriesId}`)
            .then(res => {
                setSeries(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))
    }, [])

    return (
        <div className="series-container">
            { loading && <Loading /> }
            { viewModalForm && <ModalForm page="Séries" /> }
            <MenuAdmin page="series" />
            <div className="main-series-container">
                <div className="statistics-series-main-container">
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{series.length}</h1>
                            <h2 className="statistic-description">Séries</h2>
                        </div>
                        <div>
                            <ion-icon name="videocam-outline"></ion-icon>
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
                            <h2 className="statistic-description">Stranger Things</h2>
                        </div>
                        <div>
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="series-main-container">
                    <div className="header-series-main-container">
                        <h1>Séries</h1>
                        <div>
                            <div className="input-container">
                                <input type="text" placeholder="Pesquisar" />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <button>
                                <ion-icon name="add-outline"></ion-icon>
                                Nova série
                            </button>
                        </div>
                    </div>
                    <div className="series">
                        {
                            series && series.map(serie => (
                                <div key={serie.id} className="serie">
                                    <div className="serie-image-container">
                                        <img src={serie.url_poster} alt="" />
                                    </div>
                                    <div className="serie-info-container">
                                        <h2>{serie.name}</h2>
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

export default Series