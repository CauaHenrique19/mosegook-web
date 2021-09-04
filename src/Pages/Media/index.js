import React from 'react'

import Avaliation from '../../Components/Avaliation'
import Media from '../../Components/Media'

import './style.css'

const MediaPage = () => {
    return (
        <div className="media-view-container">
            <header className="header">
                <h1>Mosegook</h1>
            </header>
            <div className="media-view-info-container">
                <div className="poster-media-container">
                    <img src="https://mosegook.s3.amazonaws.com/8ccdc51a2befcfedbfbdab5d8ad150f2-poster-cyberpunk-2077.jpg" alt="CyberPunk 2077" />
                </div>
                <div className="media-info-content">
                    <div className="header-media-info-content">
                        <h1>CyberPunk 2077</h1>
                        <div className="media-stars">
                            <ion-icon name="star"></ion-icon>
                            <p>4.5</p>
                        </div>
                    </div>
                    <p className="biography">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                        leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                        publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>
            <div className="cover-media-container">
                <img src="https://mosegook.s3.amazonaws.com/127ab83a9f2624944e607bf437ed5c28-poster-cyberpunk-timeline.png" alt="CyberPunk 2077" />
            </div>
            <div className="avaliations-most-likeds">
                <h1>Avaliações mais curtidas</h1>
                <div className="avaliations-most-likeds-container">
                    <div className="row">
                        {
                            
                        }
                    </div>
                    <div className="row">
                        {

                        }
                    </div>
                </div>
            </div>
            <div className="relationed-medias">
                <h1>Mídias Relacionadas</h1>
            </div>
        </div>
    )
}

export default MediaPage