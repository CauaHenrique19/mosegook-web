import React from 'react'

import userImage from '../../assets/user-image.png'
import './style.css'

const Ranking = () => {
    return (
        <div className="ranking-container">
            <div className="ranking-content-container">
                <h1>Ranking</h1>
                <div className="ranking-upload">
                    <div className="ranking-upload-progress">
                        <div className="upload-progress">

                        </div>
                    </div>
                    <div className="ranks">
                        <div className="rank">
                            <div className="rank-circle"></div>
                            <h3>Iniciante</h3>
                        </div>
                        <div className="rank">
                            <div className="rank-circle"></div>
                            <h3>Casual</h3>
                        </div>
                        <div className="rank">
                            <div className="rank-circle"></div>
                            <h3>Expectador</h3>
                        </div>
                        <div className="rank">
                            <div className="rank-circle"></div>
                            <h3>Fã</h3>
                        </div>
                        <div className="rank">
                            <div className="rank-circle"></div>
                            <h3>Profissional</h3>
                        </div>
                        <div className="rank">
                            <div className="rank-circle"></div>
                            <h3>Geek</h3>
                        </div>
                        <div className="rank">
                            <div className="rank-circle"></div>
                            <h3>Expert</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ranking-top-container">
                <div className="top second">
                    <img src={userImage} alt="" />
                </div>
                <div className="top first">
                    <img src={userImage} alt="" />
                </div>
                <div className="top third">
                    <img src={userImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Ranking