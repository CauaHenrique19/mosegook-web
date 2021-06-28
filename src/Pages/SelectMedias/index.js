import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import Loading from '../../Components/Loading'
import './selectMedias.css'

const SelectMedias = () => {

    const history = useHistory()
    const { user } = useContext(Context)

    const [medias, setMedias] = useState([])
    const [selectedMedias, setSelectedMedias] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/medias')
            .then(res => {
                setMedias(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))

        console.log(user)
    }, [])

    function handleSendPreferences(){
        const mediasPreferences = {
            user_id: user.id,
            media_id: selectedMedias.map(selectedMedia => selectedMedia.id)
        }
        
        api.post('/user-preferences-medias', mediasPreferences)
            .then(res => {
                history.push('/timeline')
            })
            .catch(error => console.error(error.message))   
    }

    return (
        <div className="select-medias-container">
            { loading && <Loading />}
            <header>
                <div className="logo-container">
                    <Link to="/select-genders"><ion-icon name="arrow-back-outline"></ion-icon></Link>
                    <h1>Mosegook</h1>
                </div>
                { selectedMedias.length >= 3 && <button onClick={handleSendPreferences} to="/timeline">Finalizar<ion-icon name="checkmark-outline"></ion-icon></button> }
            </header>
            <div className="main-select-medias">
                <div className="right-container">
                    <div className="info-medias">
                        <h1>Selecione no mínimo 3 mídias que você goste</h1>
                        <h3>Selecione mídias no qual você realmente goste, pois isso irá afetar na sua experiência</h3>
                    </div>
                    { selectedMedias.length >= 1 && <h1>Mídias Selecionadas</h1> }
                    <div className="selected-medias">
                        {
                            selectedMedias &&
                            selectedMedias.map(selectedMedia => (
                                <div key={selectedMedia.id} className="media">
                                    <div className="media-image-container">
                                        <img src={selectedMedia.url_poster} alt="" />
                                    </div>
                                    <div className="media-info-container">
                                        <h3>{selectedMedia.name}</h3>
                                    </div>
                                    <button onClick={() => {
                                        selectedMedias.splice(selectedMedias.indexOf(selectedMedia), 1)
                                        setSelectedMedias([...selectedMedias])
                                    }}><ion-icon name="close-outline"></ion-icon></button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="medias">
                    {
                        medias && medias.map(media => (
                            <div key={media.id} className="media">
                                <div className="media-image-container">
                                    <img src={media.url_poster} alt={media.name} />
                                </div>
                                <div className="media-info-container">
                                    <h2>{media.name}</h2>
                                    <button disabled={selectedMedias.includes(media)} onClick={() => setSelectedMedias([...selectedMedias, media])}>Selecionar</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectMedias