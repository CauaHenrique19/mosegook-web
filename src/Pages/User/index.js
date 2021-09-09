import React, { useEffect, useState, useContext, useRef } from 'react'
import { Context } from '../../context/context'

import handleDeleteAvaliation from '../../utils/handleDeleteAvaliation'
import handleDeleteComent from '../../utils/handleDeleteComent'
import Loading from '../../Components/Loading'
import Avaliation from '../../Components/Avaliation'
import Coment from '../../Components/Coment'

import api from '../../services/api'
import './user.css'
import Media from '../../Components/Media'

const User = (props) => {

    const { user: userContext } = useContext(Context)

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const [userNotExists, setUserNotExists] = useState()
    const [avaliations, setAvaliations] = useState([])
    const [coments, setComents] = useState([])
    const [following, setFollowing] = useState(false)
    const [followMe, setFollowMe] = useState(false)
    const [amountFollowers, setAmountFollowers] = useState(0)
    const [onEdit, setOnEdit] = useState(false)

    const [image, setImage] = useState({})
    const [name, setName] = useState('')
    const [biography, setBiography] = useState('')

    const [viewModal, setViewModal] = useState(false)
    const [percentualUpload, setPercentualUpload] = useState(0)

    const [viewInputSearchMedias, setViewInputSearchMedias] = useState(false)
    const [viewInputSearchGenders, setViewInputSearchGenders] = useState(false)

    const inputImage = useRef(null)

    useEffect(() => {
        async function getDatas() {
            setLoading(true)

            const { data: dataUser } = await api.get(`/users/user/${props.match.params.user}`)
            const { data: dataAvaliations } = await api.get(`/avaliations/${props.match.params.user}`)
            const { data: dataComents } = await api.get(`/coments/${props.match.params.user}`)

            if (!dataUser.message) {
                setUser(dataUser)
                setLoading(false)
                setUserNotExists(false)
                setAmountFollowers(parseInt(dataUser.followers_count.amount))
                setName(dataUser.user.name)
                setBiography(dataUser.user.biography)
                setImage(dataUser.user.url_image)
            }
            else if (dataUser.message) {
                setUserNotExists(true)
                setLoading(false)
            }
            if (dataAvaliations.avaliations.length > 0) {
                setAvaliations(dataAvaliations.avaliations)
            }
            if (dataComents.coments.length > 0) {
                setComents(dataComents.coments)
            }
        }

        getDatas()

    }, [props])

    useEffect(() => {
        async function getFollowInfo() {
            if (user !== undefined) {
                const { data: followUser } = await api.get(`/follow-user/${userContext.id}/${user.user.id}`)
                const { data: userFollow } = await api.get(`/user-follow/${userContext.id}/${user.user.id}`)
                setFollowing(followUser.follow)
                setFollowMe(userFollow.follow)
            }
        }

        getFollowInfo()
    }, [user, userContext])

    function handleFollow() {
        const follow = { user_id: userContext.id, following_user_id: user.user.id }

        if (following) {
            api.delete(`/follow/${userContext.id}/${user.user.id}`, follow)
                .then(res => {
                    setFollowing(false)
                    setAmountFollowers(parseInt(amountFollowers) - 1)
                })
                .catch(error => console.error(error.message))
        }
        else {
            api.post('/follow', follow)
                .then(res => {
                    setFollowing(true)
                    setAmountFollowers(parseInt(amountFollowers) + 1)
                })
                .catch(error => console.error(error.message))
        }
    }

    function handleEdit() {

        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('biography', biography)
        formdata.append('image', image)

        api.put(`/users/${userContext.id}`, formdata, { onUploadProgress: (e) => handleProgress(e) })
            .then(res => {
                if (res.data.message) {
                    console.log(res.data)
                }
                else {
                    console.log(res.data)
                    setOnEdit(false)
                }
            })
            .catch(error => console.error(error.message))
    }

    function handleProgress(e) {
        setViewModal(true)
        setPercentualUpload(parseInt(Math.round(e.loaded * 100) / e.total))
    }

    function handleSearchMedias(e){
        console.log(e)
    }

    function handleSearchGenders(e){
        console.log(e)
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
            {
                viewModal &&
                <div className="modal">
                    <div className="modal-content upload">
                        {
                            percentualUpload !== 100 ?
                                <ion-icon className="rotate" name="hourglass-outline"></ion-icon>
                                :
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                        }
                        {
                            percentualUpload !== 100 ?
                                <h1>Enviando...</h1> :
                                <h1>Atualizado com sucesso!</h1>
                        }
                        {
                            percentualUpload !== 100 ?
                                <div className="progress">
                                    <div style={{ width: `${percentualUpload}%` }} className="progress-content"></div>
                                </div>
                                :
                                <button
                                    onClick={() => {
                                        setViewModal(false)
                                    }}>
                                    Fechar
                                </button>
                        }
                    </div>
                </div>
            }
            <div className="profile-info-container">
                {
                    user &&
                    <div className="user-info-container">
                        <div className="image-user-container">
                            <img src={image.name ? URL.createObjectURL(image) : `${user.user.url_image}?${Date.now()}`} alt={user.user.user} />
                            {
                                onEdit &&
                                <div className="button-container">
                                    <button onClick={() => inputImage.current && inputImage.current.click()} >
                                        <ion-icon name="create-outline"></ion-icon>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="user-info">
                            {
                                !onEdit &&
                                <div className="name-container">
                                    <h1>{name}</h1>
                                    {
                                        followMe && <div className="follow-tag">Segue você</div>
                                    }
                                </div>
                            }
                            {
                                onEdit && <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Seu nome" />
                            }
                            <h1>@{user.user.user}</h1>
                            <div className="follow-container">
                                <p>{user.following_count.amount} Seguindo</p>
                                <p>{amountFollowers} Seguidores</p>
                                {userContext.user === user.user.user && <button onClick={() => setOnEdit(!onEdit)}>Editar Perfil</button>}
                                {userContext.user !== user.user.user &&
                                    <button
                                        className={following && 'selected'}
                                        onClick={() => handleFollow()}>
                                        {following ? 'Deixar de seguir' : 'Seguir'}
                                    </button>
                                }
                            </div>
                            {
                                !onEdit &&
                                <p className="biography">
                                    {biography ? biography : "Sem Biografia"}
                                </p>
                            }
                            {
                                onEdit &&
                                <textarea
                                    value={biography}
                                    onChange={e => setBiography(e.target.value)}
                                    placeholder="Sua biografia" cols="30" rows="10"
                                >
                                </textarea>
                            }
                            {
                                onEdit &&
                                <div className="buttons-container">
                                    <button className="submit-edit" onClick={() => handleEdit()} >Salvar</button>
                                    <button className="cancel-edit" onClick={() => {
                                        setOnEdit(false)
                                        setImage(user.user.url_image)
                                        inputImage.current.value = ''
                                    }}>Cancelar</button>
                                </div>
                            }
                            <input ref={inputImage} type="file" hidden={true} onChange={e => setImage(e.target.files[0])} />
                        </div>
                    </div>
                }
                {
                    user && user.medias.length > 0 ?
                        <div className="user-medias-preferences">
                            <div className="header-medias-preferences">
                                {
                                    viewInputSearchMedias ? 
                                    <input type="text" placeholder="Pesquisar..." onChange={(e) => handleSearchMedias(e.target.value)} /> : 
                                    <h1>Mídias</h1>
                                }
                                {
                                    user.user.id === userContext.id && 
                                    <button onClick={() => setViewInputSearchMedias(!viewInputSearchMedias)}>
                                            <ion-icon name="add-outline"></ion-icon>
                                    </button>
                                }
                            </div>
                            <div className="user-medias-preferences-container">
                                {
                                    user && user.medias.map(media => (
                                        <Media redirect key={media.id} selectMedia={() => { }} miniature media={media} />
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
                                {
                                    viewInputSearchGenders ? 
                                    <input type="text" placeholder="Pesquisar..." onChange={(e) => handleSearchGenders(e.target.value)} /> : 
                                    <h1>Gêneros</h1>
                                }
                                
                                { 
                                    user.user.id === userContext.id && 
                                    <button onClick={() => setViewInputSearchGenders(!viewInputSearchGenders)} >
                                        {
                                            viewInputSearchGenders ?
                                            <ion-icon name="close-outline"></ion-icon> :
                                            <ion-icon name="add-outline"></ion-icon>
                                        }
                                    </button> 
                                }
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
                        user && avaliations.length > 0?
                        avaliations.map(avaliation =>
                            <Avaliation
                                key={avaliation.id}
                                avaliation={avaliation}
                                handleDelete={() => handleDeleteAvaliation(avaliation, avaliations, setAvaliations)}
                            />
                        )
                        :
                        <div className="nothing-container">
                            <ion-icon name="alert-circle"></ion-icon>
                            <h1>Esse usuário não realizou avaliações</h1>
                        </div>
                    }
                </div>
                <div className="coment-column">
                    {
                        user && coments.length > 0 ?
                        coments.map(coment =>
                            <Coment
                                key={coment.id}
                                coment={coment}
                                handleDelete={() => handleDeleteComent(coment, coments, setComents)}
                            />
                        )
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