import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../context/context'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './coment.css'

const Coment = ({ coment }) => {

    const { user } = useContext(Context)
    const [liked, setLiked] = useState(false)
    const [like, setLike] = useState([])

    useEffect(() => {
        api.get(`/likes/coments/user/${user.id}/${coment.id}`)
            .then(res => {
                console.log(res.data)
                if(res.data.id){
                    setLike(res.data)
                    setLiked(true)
                }
                else{
                    setLiked(false)
                }
            })
            .catch(error => console.error(error))
    }, [coment])

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
                <Link to="/"><ion-icon name="add-outline"></ion-icon></Link>
            </div>
        </div>
    )
}

export default Coment