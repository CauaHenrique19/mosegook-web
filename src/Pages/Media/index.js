import React, { useEffect, useState } from 'react'

import Loading from '../../Components/Loading'
import Avaliation from '../../Components/Avaliation'
import Media from '../../Components/Media'

import api from '../../services/api'
import './style.css'

const MediaPage = (props) => {

    const [media, setMedia] = useState({})
    const [avaliations, setAvaliations] = useState({})
    const [relationedMedias, setRelationedMedias] = useState([])
    const [genders, setGenders] = useState([])
    const [loading, setLoading] = useState(true)

    const [mediaNotExists, setMediaNotExists] = useState(false)

    let [count, setCount] = useState(1)
    let [valueSlider] = useState(-1500)
    let [actualValueSlider, setActualValueSlider] = useState(0)
    let [maxCount, setMaxCount] = useState()

    useEffect(() => {
        api.get(`/media-detailed/${props.match.params.id}`)
            .then(res => {
                if(res.data.message){
                    setMediaNotExists(true)
                    setLoading(false)
                }
                else{
                    setMedia(res.data.media)
                    setAvaliations(res.data.avaliations)
                    setRelationedMedias(res.data.relationedMedias)
                    setGenders(res.data.genders)
                    setMediaNotExists(false)
                    setLoading(false)
                }
            })
            .catch(error => console.error(error))
    }, [props])

    const buttonPreviousEL = document.querySelector('.previous-button-slider')
    const buttonNextEL = document.querySelector('.next-button-slider')
    const el = document.querySelector('.relationed-medias-container')

    useEffect(() => {
        let count = Math.ceil(relationedMedias.length / 5)
        setMaxCount(count)
    }, [relationedMedias])

    function previous() {
        actualValueSlider === 0 ? actualValueSlider = 0 : actualValueSlider -= valueSlider
        setActualValueSlider(actualValueSlider)

        el.style.transform = `translate3d(${actualValueSlider}px, 0, 0)`

        count -= 1
        setCount(count)
        verifyCount()
    }

    function next() {
        actualValueSlider === 0 ? actualValueSlider = valueSlider : setActualValueSlider(1)
        actualValueSlider = valueSlider * count
        setActualValueSlider(actualValueSlider)

        el.style.transform = `translate3d(${actualValueSlider}px, 0, 0)`

        count += 1
        setCount(count)
        verifyCount()
    }

    function verifyCount() {
        count === 1 ? buttonPreviousEL.style.display = 'none' : buttonPreviousEL.style.display = 'flex'
        count === maxCount ? buttonNextEL.style.display = 'none' : buttonNextEL.style.display = 'flex'
    }

    return (
        <div className="media-view-container">
            {
                mediaNotExists &&
                <div className="container-media-not-exists">
                    <ion-icon name="alert-circle"></ion-icon>
                    <h1>M??dia n??o encontrada!</h1>
                </div> 
            }
            {loading && <Loading />}
            <header className="header">
                <h1>Mosegook</h1>
            </header>
            {
                !mediaNotExists && 
                <div className="media-view-info-container">
                    <div className="poster-media-container">
                        <img src={media.url_poster} alt={media.name} />
                    </div>
                    <div className="media-info-content">
                        <div>
                            <div className="header-media-info-content">
                                <h1>{media.name}</h1>
                                <div className="media-stars">
                                    <ion-icon name="star"></ion-icon>
                                    <p>{media.avaliation}</p>
                                </div>
                            </div>
                            <p className="synopsis">
                                {media.synopsis}
                            </p>
                        </div>
                        <div className="footer-info-content">
                            <h1>G??neros</h1>
                            <div className="genders">
                                {
                                    genders &&
                                    genders.map(gender => (
                                        <div
                                            style={{ backgroundColor: gender.color }}
                                            key={gender.color}
                                            className="gender-media">
                                            {gender.name}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                !mediaNotExists && 
                <div className="cover-media-container">
                    <img src={media.url_poster_timeline} alt={media.name} />
                </div>
            }
            {
                !mediaNotExists && 
                <div className="avaliations-most-likeds">
                    <h1>Avalia????es mais curtidas</h1>
                    <div className="avaliations-most-likeds-container">
                        <div className="row">
                            {
                                avaliations.first_row &&
                                avaliations.first_row.map(avaliation => (
                                    <Avaliation avaliation={avaliation} key={avaliation.id} />
                                ))
                            }
                        </div>
                        <div className="row">
                            {
                                avaliations.second_row &&
                                avaliations.second_row.map(avaliation => (
                                    <Avaliation avaliation={avaliation} key={avaliation.id} />
                                ))
                            }
                        </div>
                        {
                            avaliations.first_row && avaliations.second_row &&
                            avaliations.first_row.length === 0 && avaliations.second_row.length === 0 &&
                            <div className="nothing-container">
                                <h1>Nenhuma avalia????o encontrada!</h1>
                                <p>Assim que alguma avalia????o sobre essa m??dia receber intera????es n??s iremos mostrar aqui!</p>
                            </div>
                        }
                    </div>
                </div>
            }
            {
                !mediaNotExists &&
                <div className="relationed-medias">
                    <h1>M??dias Relacionadas</h1>
                    <div className="relationed-medias-content">
                        {
                            relationedMedias.length > 0 &&
                            <>
                                <button className="previous-button-slider" onClick={previous}>
                                    <ion-icon name="chevron-back-outline"></ion-icon>
                                </button>
                                <button className="next-button-slider" onClick={next} >
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </button>
                            </>
                        }
                        <div className="relationed-medias-container">
                            {
                                relationedMedias.length > 0 &&
                                relationedMedias.map(media => (
                                    <Media key={media.id} redirect media={media} selectMedia={() => { }} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
            {
                relationedMedias.length === 0 &&
                <div className="nothing-container-relationed-medias">
                    <h1>Nenhuma m??dia relacionada!</h1>
                    <p>Assim que houver alguma m??dia relacionada n??s iremos mostrar aqui!</p>
                </div>
            }
        </div>
    )
}

export default MediaPage