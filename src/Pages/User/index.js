import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import api from '../../services/api'
import Loading from '../../Components/Loading'
import Avaliation from '../../Components/Avaliation'
import Coment from '../../Components/Coment'

import './user.css'

const User = (props) => {

    const { user: userContext } = useContext(Context)

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const [userNotExists, setUserNotExists] = useState()
    const [avaliations, setAvaliations] = useState([])
    const [coments, setComents] = useState([])
    const [following, setFollowing] = useState(false)

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

    function handleFollow(){
        const follow = { user_id: userContext.id, following_user_id: user.user.id }
        
        if(following){
            setFollowing(false)
            user.followers_count.amount = parseInt(user.followers_count.amount -= 1)
        }
        else{
            setFollowing(true)
            user.followers_count.amount = parseInt(user.followers_count.amount += 1)
        }
    }

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
                                { userContext.user !== user.user.user && <button onClick={() => handleFollow()}>{following ? 'Deixar de seguir' : 'Seguir'}</button>}
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
                            <div className="header-medias-preferences">
                                <h1>Mídias</h1>
                                { user.user.id === userContext.id && <button><ion-icon name="add-outline"></ion-icon></button> }
                            </div>
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
                            <div className="header-genders-preferences">
                                <h1>Gêneros</h1>
                                { user.user.id === userContext.id && <button><ion-icon name="add-outline"></ion-icon></button> }
                            </div>
                            <div className="user-genders-preferences-container">
                                {
                                    user && user.genders.map(gender => (
                                        <div key={gender.color} style={{ backgroundColor: gender.color }} className="user-gender-preference">
                                            <p>{gender.name}</p>
                                        </div>
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
                        user && avaliations.length > 0 
                        ?
                            avaliations.map(avaliation => <Avaliation key={avaliation.id} avaliation={avaliation} />) 
                        :
                        <div className="nothing-container">
                            <ion-icon name="alert-circle"></ion-icon>
                            <h1>Esse usuário não realizou avaliações</h1>
                        </div>
                    }
                </div>
                <div className="coment-column">
                    {
                        user && coments.length > 0 
                        ? 
                            coments.map(coment => <Coment key={coment.id} coment={coment} />)
                        : 
                        <div className="nothing-container">
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