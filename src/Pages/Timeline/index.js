import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import { Link } from 'react-router-dom'

import handleDeleteAvaliation from '../../utils/handleDeleteAvaliation'
import handleDeleteComent from '../../utils/handleDeleteComent'
import Loading from '../../Components/Loading'
import Avaliation from '../../Components/Avaliation'
import Coment from '../../Components/Coment'

import api from '../../services/api'
import './timeline.css'

const Timeline = () => {

    const { user, setUser, setToken } = useContext(Context)
    const [usersToFollow, setUsersToFollow] = useState([])
    const [mediasToDiscover, setMediasToDiscover] = useState([])
    const [avaliations, setAvaliations] = useState([])
    const [coments, setComents] = useState([])
    const [mediasRated, setMediasRated] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewInputSearchUser, setViewInputSearchUser] = useState(false)
    const [viewInputSearchMediaMention, setViewInputSearchMediaMention] = useState(false)
    const [searchMediaMention, setSearchMediaMention] = useState('')
    const [mediasToMention, setMediasToMention] = useState([])
    const [searchUsers, setSearchUsers] = useState('')
    const [usersData, setUsersData] = useState([])
    const [numberVisualizers, setNumberVisualizers] = useState([])

    const [contentAvaliation, setContentAvaliation] = useState('')
    const [stars, setStars] = useState(0)
    const [mentionedMedia, setMentionedMedia] = useState(null)

    let [count, setCount] = useState(1)
    let [valueSlider] = useState(-100)
    let [actualValueSlider, setActualValueSlider] = useState(0)
    let [maxCount, setMaxCount] = useState()
    let [selectedMedia, setSelectedMedia] = useState([])

    useEffect(() => {
        api.get(`/users-to-follow/${user.id}`)
            .then(res => {
                setUsersData(res.data)
                setUsersToFollow(res.data)
            })
            .catch(error => console.error(error.message))
        api.get(`/medias/medias-to-discover/${user.id}`)
            .then(res => setMediasToDiscover(res.data.medias))
            .catch(error => console.error(error.message))
        api.get(`/avaliations-timeline/${user.id}`)
            .then(res => {
                if (res.data.avaliations.length > 0) {
                    setAvaliations(res.data.avaliations)
                }
            })
            .catch(error => console.error(error.message))
        api.get(`/medias-rated-follow/${user.id}`)
            .then(res => setMediasRated(res.data.medias))
            .catch(error => console.error(error.message))
        api.get(`/coments-timeline/${user.id}`)
            .then(res => {
                setComents(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))
    }, [user.id])

    const buttonPreviousEL = document.querySelector('.previous-button')
    const buttonNextEL = document.querySelector('.next-button')
    const el = document.querySelector('.most-rated-by-friends-slider')

    useEffect(() => {
        let count = mediasRated.length
        setMaxCount(count)

        for (let i = 0; i < count; i++) {
            numberVisualizers.push(i)
            setNumberVisualizers(numberVisualizers)
        }
    }, [mediasRated, numberVisualizers])

    useEffect(() => {
        let count = mediasRated.length
        setMaxCount(count)
    }, [mediasRated])

    useEffect(() => {
        let sMedia = mediasRated[count - 1]
        setSelectedMedia(sMedia)
    }, [count, mediasRated])

    function previous() {
        actualValueSlider === 0 ? actualValueSlider = 0 : actualValueSlider -= valueSlider
        setActualValueSlider(actualValueSlider)

        el.style.transform = `translate3d(${actualValueSlider}%, 0, 0)`

        count -= 1
        setCount(count)
        verifyCount()
    }

    function next() {
        actualValueSlider === 0 ? actualValueSlider = valueSlider : setActualValueSlider(1)
        actualValueSlider = valueSlider * count
        setActualValueSlider(actualValueSlider)

        el.style.transform = `translate3d(${actualValueSlider}%, 0, 0)`

        count += 1
        setCount(count)
        verifyCount()
    }

    function verifyCount() {
        count === 1 ? buttonPreviousEL.style.display = 'none' : buttonPreviousEL.style.display = 'flex'
        count === maxCount ? buttonNextEL.style.display = 'none' : buttonNextEL.style.display = 'flex'
    }

    function handleLogout(e) {
        e.preventDefault()
        localStorage.removeItem('mosegook_token')
        localStorage.removeItem('mosegook_user')
        setUser({})
        setToken('')
    }

    function handleSearchUsers(e) {
        setSearchUsers(e.target.value)

        if (!e.target.value) {
            setUsersData(usersToFollow)
        }
        else {
            api.get(`/users/search/${e.target.value}`)
                .then(res => {
                    setUsersData(res.data)
                })
                .catch(error => console.log(error))
        }
    }

    function clearSearch() {
        setUsersData(usersToFollow)
        setSearchUsers('')
        setViewInputSearchUser(!viewInputSearchUser)
    }

    function handleSearchMediasMention(e) {
        setSearchMediaMention(e.target.value)

        if (!e.target.value) {
            setMediasToMention([])
        }
        else {
            api.get(`/medias/search/${e.target.value}`)
                .then(res => setMediasToMention(res.data))
                .catch(error => console.error(error.data))
        }

    }

    function handleAvaliate() {
        const avaliation = { user_id: user.id, media_id: mentionedMedia.id, content: contentAvaliation, stars }

        api.post('/avaliations', avaliation)
            .then(res => {
                const updatedAvaliation = {
                    ...res.data.avaliation,
                    user_name: user.name,
                    user_id: user.id,
                    user_user: user.user,
                    media_name: mentionedMedia.name,
                    category_icon: mentionedMedia.icon,
                    category_color: mentionedMedia.color,
                    amountComents: 0,
                    amountLikes: 0
                }
                setAvaliations([updatedAvaliation, ...avaliations])
                setContentAvaliation('')
                setMentionedMedia(null)
                setStars(0)
                setSearchMediaMention('')
                setViewInputSearchMediaMention(false)
            })
            .catch(error => console.error(error.message))
    }

    return (
        <div className="timeline-container">
            {loading && <Loading />}
            <div className="most-rated-by-friends-container">
                <button className="previous-button" onClick={() => previous()}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <button className="next-button" onClick={() => next()}>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
                {
                    selectedMedia &&
                    <div className="info-media-most-rated">
                        <div className="info-media-content-most-rated">
                            <div className="name">
                                <h2>Nome</h2>
                                <h2>{selectedMedia.name}</h2>
                            </div>
                            <div className="timeline-genders">
                                <h2>G??neros</h2>
                                <div className="timeline-genders-content">
                                    {
                                        selectedMedia.genders && selectedMedia.genders.map(gender => (
                                            <div key={gender.color} style={{ backgroundColor: gender.color }} className="timeline-gender">{gender.name}</div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="most-rated-avaliation">
                                <h2>Avalia????o</h2>
                                <div className="avaliation-content">
                                    <ion-icon name="star"></ion-icon>
                                    <h2>{selectedMedia.avaliation}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="page-count">
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
                }
                <div className="most-rated-by-friends-slider">
                    {
                        mediasRated && mediasRated.map(media => (
                            <div key={media.url_poster_timeline} className="media-friends-comented">
                                <img src={media.url_poster_timeline} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="timeline-content-container">
                {
                    !loading &&
                    <div className="menu-timeline-container">
                        <div className="header-menu">
                            <h1>Mosegook</h1>
                        </div>
                        <ul className="content-menu">
                            <li className="selected"><Link to="/timeline"><ion-icon name="home-outline"></ion-icon>Timeline</Link></li>
                            <li><Link to="/ranking"><ion-icon name="stats-chart-outline"></ion-icon>Ranking</Link></li>
                            <li><Link to="/catalog"><ion-icon name="apps-outline"></ion-icon>Cat??logo</Link></li>
                            {user.admin && <li><Link to="/admin/movies"><ion-icon name="settings-outline"></ion-icon>Administrador</Link></li>}
                            <li><Link to='/opinion'><ion-icon name="happy-outline"></ion-icon>Avalie a gente</Link></li>
                            <li><Link to={`/user/${user.user}`}><ion-icon name="person-outline"></ion-icon>Perfil</Link></li>
                            <li><Link to="/" onClick={e => handleLogout(e)}><ion-icon name="log-out-outline"></ion-icon>Sair</Link></li>
                        </ul>
                    </div>
                }
                <div className="main-timeline">
                    <div className="columns-container">
                        <div className="container-new-avaliation">
                            <h1>Avalie</h1>
                            <textarea
                                value={contentAvaliation}
                                onChange={e => setContentAvaliation(e.target.value)}
                                placeholder="O que voc?? acha?"
                                maxLength="360"
                                cols="30"
                                rows="5"
                            ></textarea>
                            {
                                mentionedMedia &&
                                <div className="media-mentioned-container">
                                    <div className="media-mentioned">
                                        <div style={{ backgroundColor: mentionedMedia.color }} className="color-media-mentioned">
                                            <ion-icon name={mentionedMedia.icon}></ion-icon>
                                        </div>
                                        <div className="info-media-mentioned">
                                            <h2>Sobre</h2>
                                            <h2>{mentionedMedia.name}</h2>
                                        </div>
                                        <button onClick={() => setMentionedMedia(null)}>
                                            <ion-icon name="trash-outline"></ion-icon>
                                        </button>
                                    </div>
                                    <div className="stars">
                                        <h2>Estrelas</h2>
                                        <div>
                                            <div>
                                                <ion-icon name="star"></ion-icon>
                                                <h2>{stars}</h2>
                                            </div>
                                            <input value={stars} type="range" onChange={e => setStars(e.target.value)} name="stars" id="stars" max="5" step="0.1" />
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="footer-container-new-avaliation">
                                <div className="mention-media">
                                    <button
                                        onClick={() => setViewInputSearchMediaMention(!viewInputSearchMediaMention)}>
                                        <ion-icon name="videocam-outline"></ion-icon>
                                        Mencionar M??dia
                                    </button>
                                    {
                                        viewInputSearchMediaMention &&
                                        <div className="input-container">
                                            <input
                                                value={searchMediaMention}
                                                onChange={e => handleSearchMediasMention(e)}
                                                type="text"
                                                placeholder="Nome da m??dia"
                                            />
                                            {
                                                searchMediaMention &&
                                                <ion-icon
                                                    onClick={() => {
                                                        setMediasToMention([])
                                                        setSearchMediaMention('')
                                                    }}
                                                    name="close-outline"></ion-icon>
                                            }
                                            <ion-icon name="search-outline"></ion-icon>
                                        </div>
                                    }
                                </div>
                                <button onClick={() => handleAvaliate()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 40"
                                        fill="#fafafa">
                                        <path d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z"></path>
                                    </svg>
                                    Avaliar
                                </button>
                            </div>
                            {
                                mediasToMention.length > 0 &&
                                <div className="medias-to-mention">
                                    <div className="medias-to-mention-container">
                                        {
                                            mediasToMention.length > 0 && mediasToMention.map(media => (
                                                <div
                                                    onClick={() => {
                                                        setMentionedMedia(media)
                                                        setMediasToMention([])
                                                    }}
                                                    key={media.name}
                                                    className="media-to-mention"
                                                >
                                                    <div className="img-media-to-mention-container">
                                                        <img src={media.url_poster_timeline} alt="" />
                                                    </div>
                                                    <div className="info-media-to-mention-container">
                                                        <h2>{media.name}</h2>
                                                        <div className="genders-media-to-mention">
                                                            {
                                                                media.genders.map(gender => (
                                                                    <div
                                                                        style={{ backgroundColor: gender.color }}
                                                                        key={gender.color}
                                                                        className="gender-media-to-mention">
                                                                        {gender.name}
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="columns">
                            <div className="column-avaliations">
                                {
                                    !loading && avaliations.length > 0 ?
                                        avaliations.map(avaliation =>
                                            <Avaliation
                                                key={avaliation.id}
                                                avaliation={avaliation}
                                                handleDelete={() => handleDeleteAvaliation(avaliation, avaliations, setAvaliations)}
                                            />
                                        ) :
                                        <div className="nothing-container">
                                            <h1>Nenhuma avalia????o encontrada</h1>
                                            <p>Assim que algu??m avaliar algo do seu gosto ou algum seguidor avaliar alguma coisa mostraremos aqui.</p>
                                        </div>
                                }
                            </div>
                            <div className="column-coments">
                                {
                                    !loading && coments.length > 0 ?
                                        coments.map(coment =>
                                            <Coment
                                                key={coment.id}
                                                coment={coment}
                                                handleDelete={() => handleDeleteComent(coment, coments, setComents)}
                                            />
                                        )
                                        :
                                        <div className="nothing-container">
                                            <h1>Nenhum coment??rio encontrado</h1>
                                            <p>Assim que algu??m comentar algo do seu gosto ou algum seguidor comentar alguma coisa mostraremos aqui.</p>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="who-follow">
                            <div className="header-who-follow">
                                {!viewInputSearchUser && <h1>Quem Seguir</h1>}
                                {viewInputSearchUser && <input type="text" placeholder="Pesquisar" value={searchUsers} onChange={e => handleSearchUsers(e)} />}
                                {searchUsers && viewInputSearchUser && <button onClick={() => clearSearch()}><ion-icon name="close-outline"></ion-icon></button>}
                                <button onClick={() => setViewInputSearchUser(!viewInputSearchUser)}><ion-icon name="search-outline"></ion-icon></button>
                            </div>
                            {
                                !loading && usersData.length > 0 ? usersData.map(user => (
                                    <div key={user.user} className="content-who-follow">
                                        <div className="user-to-follow">
                                            <div>
                                                <div className="img-user-to-follow-container">
                                                    <img src={user.url_image} alt="" />
                                                </div>
                                                <div className="user-to-follow-info-container">
                                                    <h2>{user.name}</h2>
                                                    <p>@{user.user}</p>
                                                </div>
                                            </div>
                                            <Link to={`user/${user.user}`}>Ver Perfil</Link>
                                        </div>
                                    </div>
                                )) : <div className="nothing-container">
                                    <ion-icon name="alert-circle"></ion-icon>
                                    <h1>Nenhum Resultado para "{searchUsers}"</h1>
                                </div>
                            }
                        </div>
                        <div className="discover-medias">
                            <div className="discover-medias-header">
                                <h1>Descubra novas m??dias</h1>
                            </div>
                            <div className="main-discover-medias">
                                {
                                    !loading && mediasToDiscover && mediasToDiscover.map(media => (
                                        <Link to={`/media/${media.id}`} key={media.name} className="media-to-discover">
                                            <div className="img-media-to-discover-container">
                                                <img src={media.url_poster_timeline} alt="" />
                                            </div>
                                            <div className="info-media-to-discover-container">
                                                <h2>{media.name}</h2>
                                                <div className="genders-media-to-discover">
                                                    {
                                                        media.genders.map(gender => (
                                                            <div
                                                                style={{ backgroundColor: gender.color }}
                                                                key={gender.color}
                                                                className="gender-media-to-discover">
                                                                {gender.name}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline