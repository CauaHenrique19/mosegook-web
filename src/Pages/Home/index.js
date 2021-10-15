import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import { Link } from 'react-router-dom'

import Media from '../../Components/Media'
import Loading from '../../Components/Loading'
import Message from '../../Components/Message'

import api from '../../services/api'
import './home.css'

import imageNewsletter from '../../assets/Saly-19.png'

const Home = () => {

    const { user, token } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [medias, setMedias] = useState([])
    const [numberVisualizers, setNumberVisualizers] = useState([])
    const [opinions, setOpinions] = useState({})
    const [mediaName, setMediaName] = useState('')
    const [message, setMessage] = useState('')

    let [count, setCount] = useState(1)
    let [valueSlider] = useState(-1812)
    let [actualValueSlider, setActualValueSlider] = useState(0)
    let [maxCount, setMaxCount] = useState()

    useEffect(() => {
        api.get('/medias/most-rated')
            .then(res => setMedias(res.data.medias))
            .catch(err => console.error(err.message))

        api.get('/opinions-home')
            .then(res => {
                setOpinions(res.data)
                setLoading(false)
            })
            .catch(err => console.error(err.message))
    }, [])

    useEffect(() => {
        let count = Math.ceil(medias.length / 6)
        setMaxCount(count)

        for (let i = 0; i < count; i++) {
            numberVisualizers.push(i)
            setNumberVisualizers(numberVisualizers)
        }
    }, [medias, numberVisualizers])

    const buttonPreviousEL = document.querySelector('.previous-button-slider')
    const buttonNextEL = document.querySelector('.next-button-slider')
    const el = document.querySelector('.media-slider')

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

    function handleSuggestion() {
        if (!user) {
            setMessage('Você deve estar logado para sugerir!')
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
        else {
            const suggestion = { user_id: user.id, media_name: mediaName }
            api.post('/suggestions', suggestion)
                .then(res => {
                    if (res.data.length > 0) {
                        setMessage("Sugestão enviada com sucesso!")
                        setTimeout(() => {
                            setMessage('')
                        }, 3000)
                    }
                    else {
                        setMessage(res.data.message)
                        setTimeout(() => {
                            setMessage('')
                        }, 3000)
                    }
                })
                .catch(error => setMessage(error.message))
        }
    }

    return (
        <>
            <div className="container-home">
                <header className="header">
                    <div className="left-wrapper">
                        <h1>Mosegook</h1>
                    </div>
                    <div className="right-wrapper">
                        <Link to="/catalog">Catálogo</Link>
                        {!token && <Link to="/login">Entrar</Link>}
                        {token && <Link to="/timeline">Timeline</Link>}
                    </div>
                </header>
                <main className="main">
                    <div className="info-container">
                        <h1>Compartilhe suas opiniões com amigos.</h1>
                        <p>
                            Aqui você pode compartilhar suas opiniões sobre filmes, séries, livros e jogos com
                            qualquer pessoa ou amigos. Temos vários títulos famosos mas se não tiver,
                            você poderá indicar um título da sua preferência.
                        </p>
                        {!token && <Link to="/signup">Começar a avaliar</Link>}
                    </div>
                    <div className="button-next-page" onClick={() => window.scrollTo({ top: window.innerHeight * 1, behavior: 'smooth' })} >
                        <ion-icon name="chevron-down-outline"></ion-icon>
                        <ion-icon name="chevron-down-outline"></ion-icon>
                        <ion-icon name="chevron-down-outline"></ion-icon>
                    </div>
                </main>
            </div>
            <div className="our-advantages">
                <div className="advantages-description">
                    <div className="advantages-texts">
                        <h1>Motivos para você nos escolher</h1>
                        <p>Lendo nossas melhores qualidades você irá descobrir que nossa plataforma é um ótimo local de
                            discussão
                            sobre filmes, jogos, séries e livros.</p>
                    </div>
                    <div className="button-next-page" onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}>
                        <ion-icon name="chevron-down-outline"></ion-icon>
                        <ion-icon name="chevron-down-outline"></ion-icon>
                        <ion-icon name="chevron-down-outline"></ion-icon>
                    </div>
                </div>
                <div className="advantages-itens">
                    <div className="advantage">
                        <div className="circle-animation green"></div>
                        <div className="circle-animation minor green"></div>
                        <div className="circle-icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </div>
                        <h2>Comunidade Incrível</h2>
                        <p>Temo um processo altamente rigoroso para controlar a nossa comunidade. Se você achar alguém
                            inprudente poderá nos reportar.</p>
                    </div>
                    <div className="advantage">
                        <div className="circle-animation red"></div>
                        <div className="circle-animation minor red"></div>
                        <div className="circle-icon">
                            <ion-icon name="videocam-outline"></ion-icon>
                        </div>
                        <h2>Milhares de Conteúdos</h2>
                        <p>Nosso catálogo conta com milhares de filmes, livros, séries e jogos para você avaliar.</p>
                    </div>
                    <div className="advantage">
                        <div className="circle-animation orange"></div>
                        <div className="circle-animation minor orange"></div>
                        <div className="circle-icon">
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h2>Filtro de Avaliações</h2>
                        <p>Nosso filtro de avaliações é altamente rigoroso com um protocolo para que nenhum usuário seja
                            ofendido e a manutenção da ordem.</p>
                    </div>
                    <div className="advantage">
                        <div className="circle-animation blue"></div>
                        <div className="circle-animation minor blue"></div>
                        <div className="circle-icon">
                            <ion-icon name="bar-chart-outline"></ion-icon>
                        </div>
                        <h2>Sistema de Ranking</h2>
                        <p>Nossa plataforma possui um sistema de ranking que motiva nossos usuários a se manterem ativos, ganhe
                            pontos avaliando e comentando.</p>
                    </div>
                </div>
            </div>
            <div className="most-rated">
                {loading && <Loading />}
                <div className="header-most-rated">
                    <h1>Os mais bem avaliados pela comunidade</h1>
                    <div className="pages-visualizer">
                        {
                            numberVisualizers.map(number => (
                                <div
                                    key={number}
                                    className={number === count - 1 ? 'page in-that' : 'page'}
                                    onClick={() => {
                                        count = number
                                        setCount(count)
                                        next()
                                    }}
                                >
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="most-rateds-content">
                    <button className="previous-button-slider" onClick={previous}>
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </button>
                    <button className="next-button-slider" onClick={next} >
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </button>
                    <div className="media-slider">
                        {medias && medias.map(media => <Media media={media} redirect selectMedia={() => { }} key={media.url_poster} />)}
                    </div>
                </div>
                <div className="button-next-page" onClick={() => window.scrollTo({ top: window.innerHeight * 2.7, behavior: 'smooth' })} >
                    <ion-icon name="chevron-down-outline"></ion-icon>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
            </div>
            <div className="newsletter">
                <h1>Não Encontrou uma mídia de seu gosto? Sugira aqui.</h1>
                <div className="newsletter-main">
                    <div className="input-container">
                        <input value={mediaName} onChange={e => setMediaName(e.target.value)} type="text" placeholder="Título da mídia" />
                        <button onClick={() => handleSuggestion()}>Sugerir</button>
                    </div>
                    {message && <Message message={message} />}
                </div>
                <img src={imageNewsletter} alt="" />
            </div>
            <div className="we-peoples-about-us">
                <h1>O que as pessoas acham da gente</h1>
                <div className="row">
                    {
                        opinions.first_row !== undefined &&
                        opinions.first_row.map(opinion => (
                            <div key={opinion.url_image} className="people-avaliations">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="40" viewBox="0 0 51 40" fill="blueviolet">
                                        <path d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z"></path>
                                    </svg>
                                    <p>{opinion.content}</p>
                                </div>
                                <div className="info-people">
                                    <img className="people-img" src={opinion.url_image} alt="" />
                                    <div>
                                        <p>{opinion.name}</p>
                                        <p>{opinion.user}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="row">
                    {
                        opinions.second_row !== undefined &&
                        opinions.second_row.map(opinion => (
                            <div key={opinion.id} className="people-avaliations">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="40" viewBox="0 0 51 40" fill="blueviolet">
                                        <path d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z"></path>
                                    </svg>
                                    <p>{opinion.content}</p>
                                </div>
                                <div className="info-people">
                                    <img className="people-img" src={opinion.url_image} alt="" />
                                    <div>
                                        <p>{opinion.name}</p>
                                        <p>{opinion.user}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="social-media">
                <h1>Visite Nossas Redes Sociais</h1>
                <div className="buttons-social-media">
                    <a href="https://www.facebook.com/profile.php?id=100066384981305" rel="noreferrer" target="_blank">
                        <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                    <a href="https://twitter.com/mosegook" rel="noreferrer" target="_blank">
                        <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                    <a href="https://www.instagram.com/mosegook/" rel="noreferrer" target="_blank">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                </div>
            </div>
            <footer className="footer">
                <div className="left-container">
                    <div>
                        <h1>Mosegook</h1>
                        <h2>Plataforma de Avaliação de filmes, séries, livros e jogos</h2>
                    </div>
                    <h2>Mosegook © 2021</h2>
                </div>
            </footer>
        </>
    )
}

export default Home