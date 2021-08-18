import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/context'
import api from '../../services/api'
import './avaliation.css'

const Avaliation = ({ avaliation, handleDelete }) => {

    const { user } = useContext(Context)
    const [liked, setLiked] = useState(false)
    const [like, setLike] = useState([])

    useEffect(() => {
        api.get(`/likes/avaliations/user/${user.id}/${avaliation.id}`)
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
    }, [avaliation, user.id])

    function handleLike(){
        if(liked){
            api.delete(`/likes/avaliations/${like.id}`)
                .then(_ => {
                    avaliation.amountLikes = parseInt(avaliation.amountLikes) - 1 
                    setLiked(false)
                })
                .catch(error => console.error(error))
        }
        else{
            const like = { user_id: user.id, avaliation_id: avaliation.id }

            api.post('/likes/avaliations', like)
                .then(res => { 
                    setLike(res.data[0])
                    avaliation.amountLikes = parseInt(avaliation.amountLikes) + 1
                    setLiked(true)
                })
                .catch(error => console.error(error))
        }
    }

    return (
        <div key={avaliation.id} className="avaliation">
            <div className="header-avaliation">
                <div className="info-user">
                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="40" viewBox="0 0 51 40"
                        fill={avaliation.category_color}>
                        <path
                            d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z">
                        </path>
                    </svg>
                    <div className="user-info">
                        <h3>{avaliation.user_name}</h3>
                        <p>@{avaliation.user_user}</p>
                    </div>
                </div>
                <div className="info-post">
                    <p style={{ backgroundColor: avaliation.category_color }}>{avaliation.created_at}</p>
                </div>
            </div>
            <div className="content-avaliation">{avaliation.content}</div>
            <div className="footer-avaliation">
                <div className="info-media">
                    <div style={{ backgroundColor: avaliation.category_color }} className="color-avaliation">
                        <ion-icon name={avaliation.category_icon}></ion-icon>
                    </div>
                    <div className="info-footer">
                        <h3>Sobre</h3>
                        <p>
                            {
                                avaliation.media_name.length > 18 ?
                                `${avaliation.media_name.substring(0, 20)}...` :
                                avaliation.media_name
                            }
                        </p>
                    </div>
                </div>
                <div className="info-avaliation">
                    <div style={{ backgroundColor: avaliation.category_color }} className="amount-avaliations">
                        <ion-icon name="chatbubble"></ion-icon>
                        <p>{avaliation.amountComents}</p>
                    </div>
                    <div style={{ backgroundColor: avaliation.category_color }} className="amount-likes">
                        <ion-icon name="heart"></ion-icon>
                        <p>{avaliation.amountLikes}</p>
                    </div>
                </div>
            </div>
            <div className="links-avaliation-container">
                <button onClick={() => handleLike()}>
                    <ion-icon style={ liked ? { animation: 'heart 0.5s' } : { animation: 'none' }} name={liked ? 'heart' : 'heart-outline'}></ion-icon>
                </button>
                {
                    user.id === avaliation.user_id &&
                    <button onClick={handleDelete}>
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                }
                {
                    user.id !== avaliation.user_id &&
                    <Link to={`/user/${avaliation.user_user}`}><ion-icon name="person-outline"></ion-icon></Link>
                }
                <Link to={`/avaliation/${avaliation.id}`}><ion-icon name="add-outline"></ion-icon></Link>
            </div>
        </div>
    )
}

export default Avaliation