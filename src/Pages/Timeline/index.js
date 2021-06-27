import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './timeline.css'

const Timeline = () => {

    const { user } = useContext(Context)
    const [usersToFollow, setUsersToFollow] = useState([])
    const [mediasToDiscover, setMediasToDiscover] = useState([])

    useEffect(() => {
        api.get(`/users-to-follow/${user.id}`)
            .then(res => setUsersToFollow(res.data))
            .catch(error => console.error(error.message))
        api.get(`/medias/medias-to-discover/${user.id}`)
            .then(res => setMediasToDiscover(res.data.medias))
            .catch(error => console.error(error.message))
    }, [])

    return (
        <div className="timeline-container">
            <div className="most-rated-by-friends-container">
                <button>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
                <div className="info-media-most-rated">
                    <div className="info-media-content-most-rated">
                        <div className="name">
                            <h2>Nome</h2>
                            <h2>Vingadores Ultimato</h2>
                        </div>
                        <div className="timeline-genders">
                            <h2>Gêneros</h2>
                            <div className="timeline-genders-content">
                                <div className="timeline-gender">Ação</div>
                                <div className="timeline-gender">Aventura</div>
                            </div>
                        </div>
                        <div className="avaliation">
                            <h2>Avaliação</h2>
                            <div className="avaliation-content">
                                <ion-icon name="star"></ion-icon>
                                <h2>5</h2>
                            </div>
                        </div>
                    </div>
                    <div className="input-container">
                        <input type="text" placeholder="Procurar Mídias" />
                        <ion-icon name="search-outline"></ion-icon>
                    </div>
                </div>
                <div className="most-rated-by-friends-slider">
                    <div className="media-friends-comented">
                        <img src="https://mosegook.s3.amazonaws.com/6d3a7a4d19b4feb790843a5fd9f522c2-poster-sem-remorso-timeline.png" alt="" />
                    </div>
                    <div className="media-friends-comented">
                        <img src="https://mosegook.s3.amazonaws.com/6d3a7a4d19b4feb790843a5fd9f522c2-poster-sem-remorso-timeline.png" alt="" />
                    </div>
                    <div className="media-friends-comented">
                        <img src="https://mosegook.s3.amazonaws.com/6d3a7a4d19b4feb790843a5fd9f522c2-poster-sem-remorso-timeline.png" alt="" />
                    </div>
                    <div className="media-friends-comented">
                        <img src="https://mosegook.s3.amazonaws.com/6d3a7a4d19b4feb790843a5fd9f522c2-poster-sem-remorso-timeline.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="timeline-content-container">
                <div class="menu-timeline-container">
                    <div class="header-menu">
                        <h1>Mosegook</h1>
                    </div>
                    <ul class="content-menu">
                        <li className="selected"><Link to="/timeline"><ion-icon name="home-outline"></ion-icon>Timeline</Link></li>
                        <li><Link to=""><ion-icon name="stats-chart-outline"></ion-icon>Ranking</Link></li>
                        <li><Link to="/catalog"><ion-icon name="apps-outline"></ion-icon>Catálogo</Link></li>
                    </ul>
                </div>
                <div className="main-timeline">
                    <div className="column-avaliations">
                        <div className="coment">
                            <div className="header-coment">
                                <div className="info-user">
                                    <ion-icon name="chatbox"></ion-icon>
                                    <div className="user-info">
                                        <h3>Jamalzin</h3>
                                        <p>@jamalzinbotafogo</p>
                                    </div>
                                </div>
                                <div className="info-post">
                                    <p>26/06/2021 às 20:17</p>
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
                                    <div className="color-coment">
                                        <ion-icon name="game-controller"></ion-icon>
                                    </div>
                                    <div className="info-footer">
                                        <h3>Sobre</h3>
                                        <p>Pantera Negra</p>
                                    </div>
                                </div>
                                <div className="info-avaliation">
                                    <div className="amount-coments">
                                        <ion-icon name="chatbubble"></ion-icon>
                                        <p>21</p>
                                    </div>
                                    <div className="amount-likes">
                                        <ion-icon name="heart"></ion-icon>
                                        <p>100</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column-coments">
                        <div className="coment">
                            <div className="header-coment">
                                <div className="info-user">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="40" viewBox="0 0 51 40"
                                        fill="rgb(0, 128, 79)">
                                        <path
                                            d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z">
                                        </path>
                                    </svg>
                                    <div className="user-info">
                                        <h3>Jamalzin</h3>
                                        <p>@jamalzinbotafogo</p>
                                    </div>
                                </div>
                                <div className="info-post">
                                    <p>26/06/2021 às 20:17</p>
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
                                    <div className="color-coment">
                                        <ion-icon name="film"></ion-icon>
                                    </div>
                                    <div className="info-footer">
                                        <h3>sobre</h3>
                                        <p>Pantera Negra</p>
                                    </div>
                                </div>
                                <div className="info-avaliation">
                                    <div className="amount-coments">
                                        <ion-icon name="chatbubble"></ion-icon>
                                        <p>21</p>
                                    </div>
                                    <div className="amount-likes">
                                        <ion-icon name="heart"></ion-icon>
                                        <p>100</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="coment">
                            <div className="header-coment">
                                <div className="info-user">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="40" viewBox="0 0 51 40"
                                        fill="rgb(0, 128, 79)">
                                        <path
                                            d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z">
                                        </path>
                                    </svg>
                                    <div className="user-info">
                                        <h3>Jamalzin</h3>
                                        <p>@jamalzinbotafogo</p>
                                    </div>
                                </div>
                                <div className="info-post">
                                    <p>26/06/2021 às 20:17</p>
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
                                    <div className="color-coment">
                                        <ion-icon name="film"></ion-icon>
                                    </div>
                                    <div className="info-footer">
                                        <h3>sobre</h3>
                                        <p>Pantera Negra</p>
                                    </div>
                                </div>
                                <div className="info-avaliation">
                                    <div className="amount-coments">
                                        <ion-icon name="chatbubble"></ion-icon>
                                        <p>21</p>
                                    </div>
                                    <div className="amount-likes">
                                        <ion-icon name="heart"></ion-icon>
                                        <p>100</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="coment">
                            <div className="header-coment">
                                <div className="info-user">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="40" viewBox="0 0 51 40"
                                        fill="rgb(0, 128, 79)">
                                        <path
                                            d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z">
                                        </path>
                                    </svg>
                                    <div className="user-info">
                                        <h3>Jamalzin</h3>
                                        <p>@jamalzinbotafogo</p>
                                    </div>
                                </div>
                                <div className="info-post">
                                    <p>26/06/2021 às 20:17</p>
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
                                    <div className="color-coment">
                                        <ion-icon name="film"></ion-icon>
                                    </div>
                                    <div className="info-footer">
                                        <h3>sobre</h3>
                                        <p>Pantera Negra</p>
                                    </div>
                                </div>
                                <div className="info-avaliation">
                                    <div className="amount-coments">
                                        <ion-icon name="chatbubble"></ion-icon>
                                        <p>21</p>
                                    </div>
                                    <div className="amount-likes">
                                        <ion-icon name="heart"></ion-icon>
                                        <p>100</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="who-follow">
                            <div className="header-who-follow">
                                <h1>Quem Seguir</h1>
                            </div>
                            {
                                usersToFollow && usersToFollow.map(user => (
                                    <div key={user.id} className="content-who-follow">
                                        <div className="user-to-follow">
                                            <div>
                                                <div className="img-user-to-follow-container">
                                                    <img src={user.url_image} alt="" />
                                                </div>
                                                <div className="user-to-follow-info-container">
                                                    <h2>{user.name}</h2>
                                                    <p>@{user.user}</p>
                                                </div>
                                            </div>
                                            <button>Ver Perfil</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="discover-medias">
                            <div className="discover-medias-header">
                                <h1>Descubra novas mídias</h1>
                            </div>
                            <div className="main-discover-medias">
                                {
                                    mediasToDiscover && mediasToDiscover.map(media => (
                                        <div key={media.id} className="media-to-discover">
                                            <div className="img-media-to-discover-container">
                                                <img src={media.url_poster_timeline} alt="" />
                                            </div>
                                            <div className="info-media-to-discover-container">
                                                <h2>{media.name}</h2>
                                                <div className="genders-media-to-discover">
                                                    {
                                                        media.genders.map(gender => (
                                                            <div
                                                                style={{ backgroundColor: gender.color }}
                                                                key={gender.id}
                                                                className="gender-media-to-discover">
                                                                {gender.name}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline