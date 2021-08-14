import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/context'

import handleDeleteComent from '../../utils/handleDeleteComent'
import Loading from '../../Components/Loading'
import Coment from '../../Components/Coment'
import api from '../../services/api'

import './avaliationDetailed.css'

const AvaliationDetailed = (props) => {

    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [avaliationId, setAvaliationId] = useState(0)
    const [avaliationDetailed, setAvaliationDetailed] = useState({})
    const [contentComent, setContentComent] = useState('')
    const [coments, setComents] = useState([])
    const [like, setLike] = useState([])
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        setLoading(true)
        setAvaliationId(props.match.params.id)
    }, [props])
    
    useEffect(() => {
        if(avaliationId !== 0){
            api.get(`/avaliation-detailed/${avaliationId}`)
            .then(res => {
                if(res.data.avaliation){
                    setAvaliationDetailed(res.data)
                    setComents(res.data.coments)
                    setLoading(false)
                }
            })
            .catch(error => console.error(error.message))

            api.get(`/likes/avaliations/user/${user.id}/${avaliationId}`)
                .then(res => {
                    if(res.data.id){
                        setLike(res.data)
                        setLiked(true)
                    }
                    else{
                        //setLiked(false)
                    }
                })
                .catch(error => console.error(error))
        }
    }, [avaliationId])

    function handleLike(){
        if(liked){
            api.delete(`/likes/avaliations/${like.id}`)
                .then(_ => {
                    avaliationDetailed.avaliation.amountLikes = parseInt(avaliationDetailed.avaliation.amountLikes) - 1 
                    setLiked(false)
                })
                .catch(error => console.error(error))
        }
        else{
            const like = { user_id: user.id, avaliation_id: avaliationId }

            api.post('/likes/avaliations', like)
                .then(res => {
                    setLike(res.data[0])
                    avaliationDetailed.avaliation.amountLikes = parseInt(avaliationDetailed.avaliation.amountLikes) + 1
                    setAvaliationDetailed(avaliationDetailed)
                    setLiked(true)
                })
                .catch(error => console.error(error))
        }
    }

    function handleComent(){
        const coment = { user_id: user.id, avaliation_id: avaliationId, content: contentComent }
        
        api.post('/coments', coment)
            .then(res => {
                const updatedComent = {
                    ...res.data.coment[0],
                    user_name: user.name, 
                    user_id: user.id, 
                    user_user: user.user,
                    media_name: avaliationDetailed.avaliation.media_name,
                    category_icon: avaliationDetailed.avaliation.category_icon,
                    category_color: avaliationDetailed.avaliation.category_color,
                    amountLikes: 0
                }
                setComents([updatedComent, ...coments])
                setContentComent('')
            })
            .catch(error => console.error(error.message))
    }

    return (
        <div className="avaliation-detail-container">
            { loading && <Loading /> }
            <div className="avaliation-container">
                <div className="avaliation-container-header">
                    <Link to="/timeline">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                        Timeline
                    </Link>
                </div>
                {
                    avaliationDetailed.avaliation && 
                    <div className="avaliation">
                        <div className="header-coment">
                            <div className="info-user">
                                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="40" viewBox="0 0 51 40" 
                                    fill={avaliationDetailed.avaliation.category_color}>
                                    <path
                                        d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z">
                                    </path>
                                </svg>
                                <div className="user-info">
                                    <h3>{avaliationDetailed.avaliation.user_name}</h3>
                                    <p>@{avaliationDetailed.avaliation.user_user}</p>
                                </div>
                            </div>
                            <div className="info-post">
                                <p style={{ backgroundColor: avaliationDetailed.avaliation.category_color }}>{avaliationDetailed.avaliation.created_at}</p>
                            </div>
                        </div>
                        <div className="content-coment">{avaliationDetailed.avaliation.content}</div>
                        <div className="footer-coment">
                            <div className="info-media">
                                <div style={{ backgroundColor: avaliationDetailed.avaliation.category_color }} className="color-coment">
                                    <ion-icon name={avaliationDetailed.avaliation.category_icon}></ion-icon>
                                </div>
                                <div className="info-footer">
                                    <h3>Sobre</h3>
                                    <p>{avaliationDetailed.avaliation.media_name}</p>
                                </div>
                            </div>
                            <div className="info-avaliation">
                                <div style={{ backgroundColor: avaliationDetailed.avaliation.category_color }} className="amount-coments">
                                    <ion-icon name="chatbubble"></ion-icon>
                                    <p>{avaliationDetailed.avaliation.amountComents}</p>
                                </div>
                                <div style={{ backgroundColor: avaliationDetailed.avaliation.category_color }} className="amount-likes">
                                    <ion-icon name="heart"></ion-icon>
                                    <p>{avaliationDetailed.avaliation.amountLikes}</p>
                                </div>
                            </div>
                        </div>
                        <div className="links-coment-container">
                            <button onClick={() => handleLike()}>
                                <ion-icon style={ liked ? { animation: 'heart 0.5s' } : { animation: 'none' }} name={liked ? 'heart' : 'heart-outline'}></ion-icon>
                            </button>
                        </div>
                    </div>
                }
                <div className="form-coment">
                    <h1>Comente</h1>
                    <textarea 
                        value={contentComent} 
                        onChange={e => setContentComent(e.target.value)} 
                        placeholder="O que você acha?" cols="30" rows="10" maxLength="360">
                    </textarea>
                    <button onClick={() => handleComent()}>
                        <ion-icon name="chatbox"></ion-icon>
                        Comentar
                    </button>
                </div>
                <div className="avaliations-coments-container">
                    {
                        coments.length > 0 && 
                        <div className="header-avaliations-coments-container">
                            <h1>Comentários</h1>
                        </div>
                    }
                    {
                        coments.length === 0 &&
                        <div className="nothing-container">
                            <h1>Nenhum comentário encontrado</h1>
                            <p>Assim que alguém comentar mostraremos aqui pra você.</p>
                        </div>
                    }
                    <div className="coments">
                        {
                            coments.length > 0 && coments.map(coment => (
                                <Coment key={coment.id} coment={coment} handleDelete={() => handleDeleteComent(coment, coments, setComents)} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="media-avaliation-container">
                <h1>Mídia Avaliada</h1>
                {
                    avaliationDetailed.avaliation && 
                    <div className="media">
                        <div className="media-image-container">
                            <img src={avaliationDetailed.avaliation.url_poster} alt={avaliationDetailed.avaliation.media_name} />
                        </div>
                        <div className="media-info-container">
                            <h2>{avaliationDetailed.avaliation.media_name}</h2>
                        </div>
                    </div>
                }
                <h1>Gêneros</h1>
                <div className="genders-avaliation-container">
                    {
                        avaliationDetailed.genders && avaliationDetailed.genders.map(gender => (
                            <div key={gender.id} style={{ backgroundColor: gender.color }} className="gender-avaliation-container">
                                <p>{gender.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AvaliationDetailed