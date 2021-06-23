import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import './selectMedias.css'

const SelectMedias = () => {

    const [medias, setMedias] = useState([])
    const [selectedMedias, setSelectedMedias] = useState([])

    useEffect(() => {
        api.get('/medias')
            .then(res => setMedias(res.data))
            .catch(error => console.error(error.message))
    }, [])

    useEffect(() => {
        console.log(selectedMedias)
    }, [selectedMedias])

    return (
        <div className="medias-container">
            <header>
                <h1>Mosegook</h1>
            </header>
            <div className="main-medias">
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
                                    <button onClick={() => setSelectedMedias([...selectedMedias, media])}>Selecionar</button>
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