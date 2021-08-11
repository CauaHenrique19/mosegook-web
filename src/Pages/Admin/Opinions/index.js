import React, { useEffect, useState } from 'react'
import MenuAdmin from '../../../Components/MenuAdmin'
import Loading from '../../../Components/Loading'
import api from '../../../services/api'
import './style.css'

const Opinions = () => {

    const [opinions, setOpinions] = useState([])
    const [filteredOpinions, setFilteredOpinions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/opinions')
            .then(res => {
                setOpinions(res.data)
                setFilteredOpinions(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))
    }, [])

    function handleSearch(search){
        const opinionsSearched = opinions.filter(opinion => opinion.content.toLowerCase().includes(search))
        setFilteredOpinions(opinionsSearched)
    }

    return (
        <div className="opinions-admin-container">
            { loading && <Loading /> }
            <MenuAdmin page="opinions" />
            <div className="main-opinions-container">
                <div className="statistics-opinions-main-container">
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">10</h1>
                            <h2 className="statistic-description">Opiniões</h2>
                        </div>
                        <div>
                            <ion-icon name="happy-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">chrq19</h1>
                            <h2 className="statistic-description">Usuário que mais opinou</h2>
                        </div>
                        <div>
                            <ion-icon name="heart-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="opinions-main-container">
                    <div className="header-opinions-main-container">
                        <h1>Opiniões</h1>
                        <div>
                            <div className="input-container">
                                <input onChange={e => handleSearch(e.target.value)} type="text" placeholder="Pesquisar" />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                        </div>
                    </div>
                    <div className="opinions">
                        {
                            filteredOpinions.length > 0 ? filteredOpinions.map(opinion => (
                                <div key={opinion.url_image} className="opinion">
                                    <div className="opinion-info" >
                                        <div className="image-container">
                                            <img src={opinion.url_image} alt={opinion.user} />
                                        </div>
                                        <div className="info">
                                            <h2>{opinion.name}</h2>
                                            <h2>@{opinion.user}</h2>
                                        </div>
                                    </div>
                                    <div className="opinion-created-at">
                                        <h2>{opinion.created_at}</h2>
                                    </div>
                                    <div className="opinion-content">
                                        <h2>{opinion.content}</h2>
                                    </div>
                                </div>
                            )) 
                            :
                            <div className="nothing-container">
                                <h1>Nenhum resultado encontrado!</h1>
                                <p>Tente usar outra palavra para pesquisar e se encontrarmos um resultado mostraremos aqui!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Opinions