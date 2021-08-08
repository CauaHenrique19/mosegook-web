import React, { useEffect, useState } from 'react'
import MenuAdmin from '../../../Components/MenuAdmin'
import Loading from '../../../Components/Loading'
import api from '../../../services/api'
import './style.css'

const Suggestions = () => {

    const [suggestions, setSuggestions] = useState([])
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalType, setModalType] = useState('')
    const [selectedSuggestion, setSelectedSuggestion] = useState()

    useEffect(() => {
        api.get('/suggestions')
            .then(res => {
                setSuggestions(res.data)
                setFilteredSuggestions(res.data)
                setLoading(false)
            })
            .catch(error => console.log(error.message))
    }, [])

    function handleSearch(search){
        const suggestionsSearched = suggestions.filter(suggestion => suggestion.media_name.toLowerCase().includes(search))
        setFilteredSuggestions(suggestionsSearched)
    }

    function handleAccept(){
        api.put(`/suggestions/${selectedSuggestion.id}`, { status: "accept" })
            .then(res => {
                const suggestion = suggestions.find(suggestion => suggestion.id === res.data[0].id)
                suggestions.splice(suggestions.indexOf(suggestion), 1)
                res.data[0].url_image = selectedSuggestion.url_image
                res.data[0].user = selectedSuggestion.user
                res.data[0].name = selectedSuggestion.name
                suggestions.push(res.data[0])
                setSuggestions([...suggestions])
                setSuggestions([...suggestions])
                setModalType('')
            })
            .catch(error => console.error(error.message))
    }

    function handleReject(){
        api.put(`/suggestions/${selectedSuggestion.id}`, { status: "rejected" })
            .then(res => {
                const suggestion = suggestions.find(suggestion => suggestion.id === res.data[0].id)
                suggestions.splice(suggestions.indexOf(suggestion), 1)
                res.data[0].url_image = selectedSuggestion.url_image
                res.data[0].user = selectedSuggestion.user
                res.data[0].name = selectedSuggestion.name
                suggestions.push(res.data[0])
                setSuggestions([...suggestions])
                setSuggestions([...suggestions])
                setModalType('')
            })
            .catch(error => console.error(error.message))
    }

    return (
        <div className="suggestions-admin-container">
            {loading && <Loading />}
            { 
                modalType && 
                <div className="modal">
                    <div className="modal-content">
                        <div className="header-modal">
                            <h1>Confirmação</h1>
                            <button onClick={() => setModalType('')} ><ion-icon name="close-outline"></ion-icon></button>
                        </div>
                        <div className="content">
                            {
                                modalType === "accept" ? 
                                <h2>Tem certeza que deseja aceitar a sugestão feita?</h2> : 
                                <h2>Tem certeza que deseja recusar a sugestão feita?</h2> 
                            }
                        </div>
                        <div className="buttons">
                            {
                                modalType === "accept" && 
                                <button onClick={() => handleAccept()}>Aceitar</button>
                            }
                            {
                                modalType === "rejected" && 
                                <button onClick={() => handleReject()}>Recusar</button>
                            }
                            <button onClick={() => setModalType('')}>Cancelar</button>
                        </div>
                    </div>
                </div> 
            }
            <MenuAdmin page="suggestions" />
            <div className="main-suggestions-container">
                <div className="statistics-suggestions-main-container">
                    <div className="statistic">
                        <div>
                            {/* {
                                statistics != null && 
                                <>                                
                                    <h1 className="number-statisc">{statistics.amount_users}</h1>
                                    <h2 className="statistic-description">Usuários</h2>
                                </>
                            } */}
                            <h1 className="number-statisc">20</h1>
                            <h2 className="statistic-description">Sugestões</h2>
                        </div>
                        <div>
                            <ion-icon name="chatbubbles-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {/* {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.amount_admins}</h1>
                                    <h2 className="statistic-description">Administradores</h2>
                                </>
                            } */}
                            <h1 className="number-statisc">10</h1>
                            <h2 className="statistic-description">Sugestões aceitas</h2>
                        </div>
                        <div>
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {/* {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.amount_admins}</h1>
                                    <h2 className="statistic-description">Administradores</h2>
                                </>
                            } */}
                            <h1 className="number-statisc">10</h1>
                            <h2 className="statistic-description">Sugestões recusadas</h2>
                        </div>
                        <div>
                            <ion-icon name="close-circle-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {/* {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.amount_admins}</h1>
                                    <h2 className="statistic-description">Administradores</h2>
                                </>
                            } */}
                            <h1 className="number-statisc">10</h1>
                            <h2 className="statistic-description">Sugestões pendentes</h2>
                        </div>
                        <div>
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="suggestions-main-container">
                    <div className="header-suggestions-main-container">
                        <h1>Sugestões</h1>
                        <div>
                            <div className="input-container">
                                <input onChange={e => handleSearch(e.target.value)} type="text" placeholder="Pesquisar" />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                        </div>
                    </div>
                    <div className="suggestions">
                        {
                            filteredSuggestions.length > 0 ? filteredSuggestions.map(suggestion => (
                                <div key={suggestion.id} className="suggestion">
                                    <div className="suggestion-info" >
                                        <div className="image-container">
                                            <img src={suggestion.url_image} alt={suggestion.user} />
                                        </div>
                                        <div className="info">
                                            <h2>{suggestion.name}</h2>
                                            <h2>@{suggestion.user}</h2>
                                        </div>
                                    </div>
                                    <div className="suggestion-media-name">
                                        <h2>{suggestion.media_name}</h2>
                                    </div>
                                    <div className="suggestion-created-at">
                                        <h2>{suggestion.created_at}</h2>
                                    </div>
                                    <div className="suggestion-status">
                                        <h2>{suggestion.status === "pending" ? "Pendente" : ( suggestion.status === "accept" ? "Aceita" : "Recusada" )}</h2>
                                    </div>
                                    <div className="buttons">
                                        <button 
                                            onClick={() => {
                                                setModalType("accept")
                                                setSelectedSuggestion(suggestion)
                                            }}>
                                            <ion-icon name="checkmark-outline"></ion-icon>
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setModalType("rejected")
                                                setSelectedSuggestion(suggestion)
                                            }}>
                                            <ion-icon name="close-outline"></ion-icon>
                                        </button>
                                    </div>
                                </div>
                            )) :
                            <div className="nothing-container" >
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

export default Suggestions