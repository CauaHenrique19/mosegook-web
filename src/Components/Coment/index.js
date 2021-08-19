import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../context/context'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './coment.css'

const Coment = ({ coment, handleDelete }) => {

    const { user } = useContext(Context)
    const [liked, setLiked] = useState(false)
    const [like, setLike] = useState([])

    useEffect(() => {
        api.get(`/likes/coments/user/${user.id}/${coment.id}`)
            .then(res => {
                if(res.data.id){
                    setLike(res.data)
                    setLiked(true)
                }
                else{
                    setLiked(false)
                }
            })
            .catch(error => console.error(error))
    }, [coment, user.id])

    function handleLike(){
        if(liked){
            api.delete(`/likes/coments/${like.id}`)
                .then(_ => {
                    coment.amountLikes = parseInt(coment.amountLikes) - 1
                    setLiked(false)
                })
                .catch(error => console.error(error))
        }
        else{
            const like = { user_id: user.id, coment_id: coment.id }
            api.post('/likes/coments', like)
                .then(res => { 
                    setLike(res.data[0])
                    coment.amountLikes = parseInt(coment.amountLikes) + 1
                    setLiked(true)
                })
                .catch(error => console.error(error))
        }
    }

    return (
        <div key={coment.id} className="coment">
            <div className="header-coment">
                <div className="info-user">
                    <ion-icon style={{ color: coment.category_color }} name="chatbox"></ion-icon>
                    <div className="user-info">
                        <h3>{coment.user_name}</h3>
                        <p>@{coment.user_user}</p>
                    </div>
                </div>
                <div className="info-post">
                    <p style={{ backgroundColor: coment.category_color }}>{coment.created_at}</p>
                </div>
            </div>
            <div className="content-coment">{coment.content}</div>
            <div className="footer-coment">
                <div className="info-media">
                    <div style={{ backgroundColor: coment.category_color }} className="color-coment">
                        <ion-icon name={coment.category_icon}></ion-icon>
                    </div>
                    <div className="info-footer">
                        <h3>Sobre</h3>
                        <p>
                            {
                                coment.media_name.length > 18 ? 
                                `${coment.media_name.substring(0, 17)}...` :
                                coment.media_name
                            }
                        </p>
                    </div>
                </div>
                <div className="info-coment">
                    <div style={{ backgroundColor: coment.category_color }} className="amount-likes">
                        <ion-icon name="heart"></ion-icon>
                        <p>{coment.amountLikes}</p>
                    </div>
                </div>
            </div>
            <div className="links-coment-container">
                <button 
                    onClick={() => handleLike()}>
                        <ion-icon 
                            style={ liked ? { animation: 'heart 0.5s' } : { animation: 'none' }} 
                            name={liked ? 'heart' : 'heart-outline'}>
                        </ion-icon>
                </button>
                {
                    user.id === coment.user_id && 
                    <button onClick={() => handleDelete(coment)}>
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                }
                {
                    user.id !== coment.user_id &&
                    <Link to={`/user/${coment.user_user}`}><ion-icon name="person-outline"></ion-icon></Link>
                }
                <Link to={`/avaliation/${coment.avaliation_id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="40" viewBox="0 0 51 40" fill="#fff">
                        <path
                            d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z">
                        </path>
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default Coment