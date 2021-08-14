import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import Loading from '../../Components/Loading'
import './selectMedias.css'
import Media from '../../Components/Media'

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
    }, [])

    useEffect(() => {
        console.log(selectedMedias)
    }, [selectedMedias])

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

    function removeSelectedMedia(selectedMedia){
        selectedMedias.splice(selectedMedias.indexOf(selectedMedia), 1)
        setSelectedMedias([...selectedMedias])
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
                                <Media 
                                    selectMedia={() => {}} 
                                    media={selectedMedia} 
                                    selected 
                                    removeMedia={() => removeSelectedMedia(selectedMedia)} 
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="medias">
                    {
                        medias && medias.map(media => (
                            <Media 
                                selectMedia={() => setSelectedMedias([...selectedMedias, media])} 
                                media={media} 
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectMedias