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

    const [initialLengthMedias, setInitialLengthMedias] = useState()
    const [initialLengthGenders, setInitialLengthGenders] = useState()

    const [image, setImage] = useState({})
    const [name, setName] = useState('')
    const [biography, setBiography] = useState('')

    const [viewModal, setViewModal] = useState(false)
    const [percentualUpload, setPercentualUpload] = useState(0)

    const [viewInputSearchMedias, setViewInputSearchMedias] = useState(false)
    const [viewInputSearchGenders, setViewInputSearchGenders] = useState(false)

    const [viewModalMedias, setViewModalMedias] = useState(false)
    const [viewModalGenders, setViewModalGenders] = useState(false)

    const [mediasSearched, setMediasSearched] = useState([])
    const [gendersSearched, setGendersSearched] = useState([])

    const inputImage = useRef(null)

    useEffect(() => {
        async function getDatas() {
            setLoading(true)

            const { data: dataUser } = await api.get(`/users/user/${props.match.params.user}`)
            const { data: dataAvaliations } = await api.get(`/avaliations/${props.match.params.user}`)
            const { data: dataComents } = await api.get(`/coments/${props.match.params.user}`)

            if (!dataUser.message) {
                setUser(dataUser)
                setInitialLengthMedias(dataUser.medias.length)
                setInitialLengthGenders(dataUser.genders.length)
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
                }
                else {
                    setOnEdit(false)
                }
            })
            .catch(error => console.error(error.message))
    }

    function handleProgress(e) {
        setViewModal(true)
        setPercentualUpload(parseInt(Math.round(e.loaded * 100) / e.total))
    }

    function handleSearchMedias(e) {
        setViewModalMedias(e !== "")
        api.get(`/medias/search/${e}`)
            .then(res => setMediasSearched(res.data))
            .catch(error => console.error(error.message))
    }

    function handleSearchGenders(e) {
        setViewModalGenders(e !== "")
        api.get(`/genders/${e}`)
            .then(res => setGendersSearched(res.data))
            .catch(error => console.error(error.message))
    }

    function handleSelectMedia(media, e){
        e.preventDefault()
        user.medias.push(media)
        setUser({...user})
        setViewModalMedias(false)
    }

    function handleSelectGenders(gender){
        user.genders.push(gender)
        setUser({...user})
        setViewModalGenders(false)
    }

    function handleSubmitMedias(){
        const medias_id = user.medias.map(media => media.id)
        api.put(`/user-preferences-medias/${user.user.id}`, { medias_id })
            .then(res => {
                if(res.status === 200){
                    setInitialLengthMedias(medias_id.length)
                    setViewInputSearchMedias(false)
                }
            })
            .catch(error => console.error(error.message))
        
    }

    function handleSubmitGenders(){
        const genders_id = user.genders.map(gender => gender.id)
        api.put(`/user-preferences-genders/${user.user.id}`, { genders_id })
            .then(res => {
                if(res.status === 200){
                    setInitialLengthGenders(genders_id.length)
                    setViewInputSearchGenders(false)
                }
            })
            .catch(error => console.error(error.message))
    }

    return (
        <div className="profile-container">
            {
                userNotExists &&
                <div className="container-user-not-exists">
                    <ion-icon name="alert-circle"></ion-icon>
                    <h1>Este usu??rio n??o existe!</h1>
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
                                        followMe && <div className="follow-tag">Segue voc??</div>
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
                                        <h1>M??dias</h1>
                                }
                                {
                                    user.user.id === userContext.id &&
                                    <button 
                                        onClick={() => { 
                                            setViewInputSearchMedias(!viewInputSearchMedias)
                                            if(viewInputSearchMedias){
                                                setViewModalMedias(false)
                                            } 
                                        }}
                                    >
                                        {
                                            viewInputSearchMedias ?
                                                <ion-icon name="close-outline"></ion-icon> :
                                                <ion-icon name="add-outline"></ion-icon>
                                        }
                                    </button>
                                }
                            </div>
                            {
                                mediasSearched &&
                                mediasSearched.length > 0 &&
                                viewModalMedias &&
                                <div className="modal-medias">
                                    {
                                        mediasSearched.map(media => (
                                            <Media key={media.id} selectMedia={(e) => handleSelectMedia(media, e)} miniature media={media} />
                                        ))
                                    }
                                </div>
                            }
                            <div className="user-medias-preferences-container">
                                {
                                    user && !viewModalMedias && user.medias.map(media => (
                                        <Media redirect key={media.id} selectMedia={() => {  }} miniature media={media} />
                                    ))
                                }
                            </div>
                            {
                                initialLengthMedias !== user.medias.length &&
                                <button onClick={() => handleSubmitMedias()}>Salvar</button>
                            }
                        </div>
                        :
                        <div className="nothing-container">
                            <ion-icon name="alert-circle"></ion-icon>
                            <h1>Esse usu??rio n??o possui prefer??ncia por m??dias</h1>
                        </div>
                }
                {
                    user && user.genders.length > 0 ?
                        <div className="user-genders-preferences">
                            <div className="header-genders-preferences">
                                {
                                    viewInputSearchGenders ?
                                        <input type="text" placeholder="Pesquisar..." onChange={(e) => handleSearchGenders(e.target.value)} /> :
                                        <h1>G??neros</h1>
                                }

                                {
                                    user.user.id === userContext.id &&
                                    <button 
                                        onClick={() => {
                                            setViewInputSearchGenders(!viewInputSearchGenders)
                                            if(viewInputSearchGenders){
                                                setViewModalGenders(false)
                                            } 
                                        }} 
                                    >
                                        {
                                            viewInputSearchGenders ?
                                                <ion-icon name="close-outline"></ion-icon> :
                                                <ion-icon name="add-outline"></ion-icon>
                                        }
                                    </button>
                                }
                            </div>
                            {
                                gendersSearched &&
                                gendersSearched.length > 0 &&
                                viewModalGenders &&
                                <div className="modal-genders">
                                    {
                                        gendersSearched.map(gender => (
                                            <div 
                                                onClick={() => handleSelectGenders(gender)} 
                                                key={gender.color} 
                                                style={{ backgroundColor: gender.color }} 
                                                className="user-gender-preference"
                                            >
                                                <p>{gender.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            <div className="user-genders-preferences-container">
                                {
                                    user && !viewModalGenders && user.genders.map(gender => (
                                        <div key={gender.color} style={{ backgroundColor: gender.color }} className="user-gender-preference">
                                            <p>{gender.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                initialLengthGenders !== user.genders.length &&
                                <button onClick={() => handleSubmitGenders()}>Salvar</button>
                            }
                        </div>
                        : <div className="nothing-container">
                            <ion-icon name="alert-circle"></ion-icon>
                            <h1>Esse usu??rio n??o possui prefer??ncia por g??neros</h1>
                        </div>
                }
            </div>
            <div className="profile-interations-container">
                <div className="avaliations-column">
                    {
                        user && avaliations.length > 0 ?
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
                                <h1>Esse usu??rio n??o realizou avalia????es</h1>
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
                                <h1>Esse usu??rio n??o realizou coment??rios</h1>
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default User