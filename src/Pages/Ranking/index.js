import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'

import api from '../../services/api'

import './style.css'

const Ranking = () => {

    const { user } = useContext(Context) 

    const [ranks, setRanks] = useState([])
    const [top, setTop] = useState([])
    const [rankStatus, setRankStatus] = useState({})

    useEffect(() => {
        api.get('/ranks')
            .then(res => setRanks(res.data))
            .catch(error => console.error(error.message))

        api.get('/ranks/top')
            .then(res => setTop(res.data))
            .catch(error => console.error(error.message))

        api.get(`/users/rank/${user.id}`)
            .then(res => setRankStatus(res.data))
            .catch(error => console.error(error.message))
    }, [user])

    return (
        <div className="ranking-container">
            <div className="ranking-content-container">
                <h1>Ranking</h1>
                <div className="ranking-upload">
                    <div className="ranking-upload-progress" >
                        <div className="upload-progress" style={{ width: rankStatus.percentualToNextRank }} ></div>
                    </div>
                    <div className="ranks">
                        {
                            ranks &&
                            ranks.map((rank, index) => (
                                <div className="rank" >
                                    <div className="rank-circle" style={{ borderWidth: 2, borderStyle: 'solid', borderColor: rank.color }}>
                                        <h2>{index + 1}</h2>
                                    </div>
                                    <h3>{rank.name}</h3>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="ranking-top-container">
                {
                    top &&
                    top.map(user => (
                        <div className={`top ${user.position}`}>
                            <img src={user.url_image} alt={user.user_name} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Ranking