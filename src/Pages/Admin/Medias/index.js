import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import MenuAdmin from '../../../Components/MenuAdmin'
import ModalForm from '../../../Components/ModalForm'
import Loading from '../../../Components/Loading'
import api from '../../../services/api'
import './medias.css'

const Medias = ({ category_id, page, texts, pageName }) => {

    const { viewModalForm, setViewModalForm } = useContext(Context)
    const [filteredMedias, setFilteredMedias] = useState([])
    const [medias, setMedias] = useState([])
    const [loading, setLoading] = useState(true)
    const [amountAvaliations, setAmountAvaliations] = useState([])
    const [mostRated, setMostRated] = useState([])
    const [mostGoodRated, setMostGoodRated] = useState([])
    const [data, setData] = useState({})

    useEffect(() => {
        api(`/medias/${category_id}`)
            .then(res => {
                setMedias(res.data)
                setFilteredMedias(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))

        api(`/medias/statistics/${category_id}`)
            .then(res => {
                setAmountAvaliations(res.data.amountAvaliations)
                setMostRated(res.data.mostRated)
                setMostGoodRated(res.data.mostGoodRated)
            })
            .catch(error => console.error(error.message))
    }, [category_id])

    function handleSearch(search){
        const mediasSearched = medias.filter(media => media.name.toLowerCase().includes(search))
        setFilteredMedias(mediasSearched)
    }

    return (
        <div className="medias-admin-container">
            { loading && <Loading /> }
            { viewModalForm && <ModalForm type="form-media" page={texts} data={data} /> }
            <MenuAdmin page={page} />
            <div className="main-medias-container">
                <div className="statistics-medias-main-container">
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{medias.length}</h1>
                            <h2 className="statistic-description">{texts}</h2>
                        </div>
                        <div>
                            { page === "movies" && <ion-icon name="film-outline"></ion-icon> }
                            { page === "series" && <ion-icon name="videocam-outline"></ion-icon> }
                            { page === "books" &&  <ion-icon name="book-outline"></ion-icon> }
                            { page === "games" && <ion-icon name="game-controller-outline"></ion-icon> }
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{ amountAvaliations.length > 0 ? amountAvaliations[0].amount_avaliations : '0'}</h1>
                            <h2 className="statistic-description">{ amountAvaliations.length > 0 ? 'Avaliações' : 'Nenhuma'}</h2>
                        </div>
                        <div>
                            <ion-icon name="chatbox-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{ mostRated.length > 0 ? mostRated[0].amount_avaliations : '0'}</h1>
                            <h2 className="statistic-description">{ mostRated.length > 0 ? mostRated[0].name : 'Nenhuma' }</h2>
                        </div>
                        <div>
                            <ion-icon name="heart-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{ mostGoodRated.length > 0 ? mostGoodRated[0].media_stars.replace('.', ',') : '0'}</h1>
                            <h2 className="statistic-description">{ mostGoodRated.length > 0 ? mostGoodRated[0].name : 'Nenhuma' }</h2>
                        </div>
                        <div>
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="medias-main-container">
                    <div className="header-medias-main-container">
                        <h1>{texts}</h1>
                        <div>
                            <div className="input-container">
                                <input onChange={e => handleSearch(e.target.value)} type="text" placeholder="Pesquisar" />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <button>
                                <ion-icon name="add-outline"></ion-icon>
                                {pageName === "série" ? 'Nova série' : 'Novo ' + pageName}
                            </button>
                        </div>
                    </div>
                    {
                        filteredMedias.length === 0 && 
                        <div className="nothing-container">
                            <h1>Nenhum resultado encontrado!</h1>
                            <p>Tente usar outra palavra para pesquisar e se encontrarmos um resultado mostraremos aqui!</p>
                        </div>
                    }
                    <div className="medias">
                        {
                            filteredMedias.length > 0 && filteredMedias.map(media => (
                                <div key={media.id} className="media">
                                    <div className="media-image-container">
                                        <img src={media.url_poster} alt="" />
                                    </div>
                                    <div className="media-info-container">
                                        <h2>{media.name}</h2>
                                        <div className="buttons-media-info-container">
                                            <button 
                                                onClick={() => {
                                                    setViewModalForm(!viewModalForm)
                                                    setData(media)
                                                }}
                                            >
                                                <ion-icon name="create-outline"></ion-icon>
                                            </button>
                                            <button onClick={() => setViewModalForm(!viewModalForm)}><ion-icon name="trash-outline"></ion-icon></button>
                                        </div>
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

export default Medias