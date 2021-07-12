import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import api from '../../services/api'
import Loading from '../../Components/Loading'

import './user.css'

const User = (props) => {

    const { user: userContext } = useContext(Context)

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const [userNotExists, setUserNotExists] = useState()
    const [avaliations, setAvaliations] = useState([])
    const [coments, setComents] = useState([])

    useEffect(() => {

        async function getDatas(){
            setLoading(true)

            const { data: dataUser } = await api.get(`/users/${props.match.params.user}`)
            const { data: dataAvaliations } = await api.get(`avaliations/${props.match.params.user}`)
            const { data: dataComents } = await api.get(`coments/${props.match.params.user}`)

            if(!dataUser.message){
                setUser(dataUser)
                setLoading(false)
                setUserNotExists(false)
            }
            else if(dataUser.message){
                setUserNotExists(true)
                setLoading(false)
            }
            if(dataAvaliations.avaliations.length > 0){
                setAvaliations(dataAvaliations.avaliations)
            }
            if(dataComents.coments.length > 0){
                setComents(dataComents.coments)
            }
        }

        getDatas()
        
    }, [props])

    return (
        <div className="profile-container">
            {
                userNotExists &&
                <div className="container-user-not-exists">
                    <ion-icon name="alert-circle"></ion-icon>
                    <h1>Este usuário não existe!</h1>
                </div> 
            }
            {loading && <Loading />}
            <div className="profile-info-container">
                {
                    user &&
                    <div className="user-info-container">
                        <img src={user.user.url_image} alt="" />
                        <div className="user-info">
                            <h1>{user.user.name}</h1>
                            <h1>@{user.user.user}</h1>
                            <div className="follow-container">
                                <p>{user.following_count.amount} Seguindo</p>
                                <p>{user.followers_count.amount} Seguidores</p>
                                { userContext.user === user.user.user && <button>Editar Perfil</button> }
                                { userContext.user !== user.user.user && <button>Seguir</button>}
                            </div>
                            <p className="biography">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                the
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                type
                                and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                                the
                                leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                        </div>
                    </div>
                }
                {
                    user && user.medias.length > 0 ?
                        <div className="user-medias-preferences">
                            <h1>Mídias</h1>
                            <div className="user-medias-preferences-container">
                                {
                                    user && user.medias.map(media => (
                                        <div key={media.key_poster} className="user-media-preference">
                                            <div className="user-media-preference-img-container">
                                                <img src={media.url_poster} alt="" />
                                            </div>
                                            <div className="user-media-preference-media-info-container">
                                                <h2>{media.name}</h2>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        :
                        <div className="nothing-container">
                            <ion-icon name="alert-circle"></ion-icon>
                            <h1>Esse usuário não possui preferência por mídias</h1>
                        </div>
                }
                {
                    user && user.genders.length > 0 ?
                        <div className="user-genders-preferences">
                            <h1>Gêneros</h1>
                            <div className="user-genders-preferences-container">
                                {
                                    user && user.genders.map(gender => (
                                        <div key={gender.color} style={{ backgroundColor: gender.color }} className="user-gender-preference">{gender.name}</div>
                                    ))
                                }
                            </div>
                        </div>
                        : <div className="nothing-container">
                            <ion-icon name="alert-circle"></ion-icon>
                            <h1>Esse usuário não possui preferência por gêneros</h1>
                        </div>
                }
            </div>
            <div className="profile-interations-container">
                <div className="avaliations-column">
                    {
                        user && avaliations.length > 0 && avaliations.map(avaliation => (
                            <div key={avaliation.id} className="coment">
                                <div className="header-coment">
                                    <div className="info-user">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="40" viewBox="0 0 51 40"
                                            fill={avaliation.category_color}>
                                            <path
                                                d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z">
                                            </path>
                                        </svg>
                                        <div className="user-info">
                                            <h3>{user.user.name}</h3>
                                            <p>@{user.user.user}</p>
                                        </div>
                                    </div>
                                    <div className="info-post">
                                        <p style={{ backgroundColor: avaliation.category_color }}>{avaliation.created_at.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="content-coment">{avaliation.content}</div>
                                <div className="footer-coment">
                                    <div className="info-media">
                                        <div style={{ backgroundColor: avaliation.category_color }} className="color-coment">
                                            <ion-icon name={avaliation.category_icon}></ion-icon>
                                        </div>
                                        <div className="info-footer">
                                            <h3>Sobre</h3>
                                            <p>{avaliation.media_name}</p>
                                        </div>
                                    </div>
                                    <div className="info-avaliation">
                                        <div style={{ backgroundColor: avaliation.category_color }} className="amount-coments">
                                            <ion-icon name="chatbubble"></ion-icon>
                                            <p>0</p>
                                        </div>
                                        <div style={{ backgroundColor: avaliation.category_color }} className="amount-likes">
                                            <ion-icon name="heart"></ion-icon>
                                            <p>0</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="links-coment-container">
                                    <button><ion-icon name="heart-outline"></ion-icon></button>
                                    <button><ion-icon name="add-outline"></ion-icon></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="coment-column">
                    {
                        user && coments.length > 0 ? coments.map(coment => (
                            <div key={coment.id} className="coment">
                                <div className="header-coment">
                                    <div className="info-user">
                                        <ion-icon style={{ color: coment.category_color }} name="chatbox"></ion-icon>
                                        <div className="user-info">
                                            <h3>{user.user.name}</h3>
                                            <p>@{user.user.user}</p>
                                        </div>
                                    </div>
                                    <div className="info-post">
                                        <p style={{ backgroundColor: coment.category_color }}>{coment.created_at}</p>
                                    </div>
                                </div>
                                <div className="content-coment">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                    been
                                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                                    galley
                                    of type and scrambled it to make a type specimen book.
                                </div>
                                <div className="footer-coment">
                                    <div className="info-media">
                                        <div className="color-coment" style={{ backgroundColor: coment.category_color }}>
                                            <ion-icon name={coment.category_icon}></ion-icon>
                                        </div>
                                        <div className="info-footer">
                                            <h3>Sobre</h3>
                                            <p>{coment.media_name}</p>
                                        </div>
                                    </div>
                                    <div className="info-avaliation">
                                        <div className="amount-coments" style={{ backgroundColor: coment.category_color }}>
                                            <ion-icon name="chatbubble"></ion-icon>
                                            <p>0</p>
                                        </div>
                                        <div className="amount-likes" style={{ backgroundColor: coment.category_color }}>
                                            <ion-icon name="heart"></ion-icon>
                                            <p>0</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="links-coment-container">
                                    <button><ion-icon name="heart-outline"></ion-icon></button>
                                    <button><ion-icon name="add-outline"></ion-icon></button>
                                </div>
                            </div>
                        ))
                        : <div className="nothing-container">
                            <ion-icon name="alert-circle"></ion-icon>
                            <h1>Esse usuário não realizou comentários</h1>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default User