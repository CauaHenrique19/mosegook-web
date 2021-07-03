import React, { useEffect, useState } from 'react'
import './user.css'

import imageUser from '../../assets/user-image.png'

const User = (props) => {

    const [userRoute, setUserRoute] = useState('')

    useEffect(() => {
        setUserRoute(props.match.params.user)
    }, [props])

    return (
        <div className="profile-container">
            <div className="profile-info-container">
                <div className="user-info-container">
                    <img src={imageUser} alt="" />
                    <div className="user-info">
                        <h1>Nome do Usuário</h1>
                        <h1>@user</h1>
                        <div className="follow-container">
                            <p>255 Seguindo</p>
                            <p>380 Seguidores</p>
                            <button>Seguir</button>
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
                <div className="user-medias-preferences">
                    <h1>Mídias</h1>
                    <div className="user-medias-preferences-container">
                        <div className="user-media-preference">
                            <div className="user-media-preference-img-container">
                                <img src="https://mosegook.s3.amazonaws.com/786c02a10a6332b1d11ea4ff5cf7fe3a-poster-pantera-negra.jpg" alt="" />
                            </div>
                            <div className="user-media-preference-media-info-container">
                                <h2>Pantera Negra</h2>
                            </div>
                        </div>
                        <div className="user-media-preference">
                            <div className="user-media-preference-img-container">
                                <img src="https://mosegook.s3.amazonaws.com/786c02a10a6332b1d11ea4ff5cf7fe3a-poster-pantera-negra.jpg" alt="" />
                            </div>
                            <div className="user-media-preference-media-info-container">
                                <h2>Pantera Negra</h2>
                            </div>
                        </div>
                        <div className="user-media-preference">
                            <div className="user-media-preference-img-container">
                                <img src="https://mosegook.s3.amazonaws.com/786c02a10a6332b1d11ea4ff5cf7fe3a-poster-pantera-negra.jpg" alt="" />
                            </div>
                            <div className="user-media-preference-media-info-container">
                                <h2>Pantera Negra</h2>
                            </div>
                        </div>
                        <div className="user-media-preference">
                            <div className="user-media-preference-img-container">
                                <img src="https://mosegook.s3.amazonaws.com/786c02a10a6332b1d11ea4ff5cf7fe3a-poster-pantera-negra.jpg" alt="" />
                            </div>
                            <div className="user-media-preference-media-info-container">
                                <h2>Pantera Negra</h2>
                            </div>
                        </div>
                        <div className="user-media-preference">
                            <div className="user-media-preference-img-container">
                                <img src="https://mosegook.s3.amazonaws.com/786c02a10a6332b1d11ea4ff5cf7fe3a-poster-pantera-negra.jpg" alt="" />
                            </div>
                            <div className="user-media-preference-media-info-container">
                                <h2>Pantera Negra</h2>
                            </div>
                        </div>
                        <div className="user-media-preference">
                            <div className="user-media-preference-img-container">
                                <img src="https://mosegook.s3.amazonaws.com/786c02a10a6332b1d11ea4ff5cf7fe3a-poster-pantera-negra.jpg" alt="" />
                            </div>
                            <div className="user-media-preference-media-info-container">
                                <h2>Pantera Negra</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-genders-preferences">
                    <h1>Gêneros</h1>
                    <div className="user-genders-preferences-container">
                        <div className="user-gender-preference">Crime</div>
                        <div className="user-gender-preference">Comédia</div>
                        <div className="user-gender-preference">Ação</div>
                        <div className="user-gender-preference">Aventura</div>
                    </div>
                </div>
            </div>
            <div className="profile-interations-container">
                <div className="avaliations-column">
                    <div className="coment">
                        <div className="header-coment">
                            <i className="fas fa-comment-alt"></i>
                            <div className="user-info">
                                <h3>Jamalzin</h3>
                                <p>@jamalzinbotafogo</p>
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
                            <div className="color-coment">
                                <i className="fas fa-gamepad"></i>
                            </div>
                            <div className="info-footer">
                                <h3>sobre</h3>
                                <p>Pantera Negra</p>
                            </div>
                        </div>
                    </div>
                    <div className="coment">
                        <div className="header-coment">
                            <i className="fas fa-comment-alt"></i>
                            <div className="user-info">
                                <h3>Jamalzin</h3>
                                <p>@jamalzinbotafogo</p>
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
                            <div className="color-coment">
                                <i className="fas fa-gamepad"></i>
                            </div>
                            <div className="info-footer">
                                <h3>sobre</h3>
                                <p>Pantera Negra</p>
                            </div>
                        </div>
                    </div>
                    <div className="coment">
                        <div className="header-coment">
                            <i className="fas fa-comment-alt"></i>
                            <div className="user-info">
                                <h3>Jamalzin</h3>
                                <p>@jamalzinbotafogo</p>
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
                            <div className="color-coment">
                                <i className="fas fa-gamepad"></i>
                            </div>
                            <div className="info-footer">
                                <h3>sobre</h3>
                                <p>Pantera Negra</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="coment-column">
                    <div className="coment">
                        <div className="header-coment">
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
                        <div className="content-coment">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book.
                        </div>
                        <div className="footer-coment">
                            <div className="color-coment">
                                <i className="fas fa-gamepad"></i>
                            </div>
                            <div className="info-footer">
                                <h3>sobre</h3>
                                <p>Pantera Negra</p>
                            </div>
                        </div>
                    </div>
                    <div className="coment">
                        <div className="header-coment">
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
                        <div className="content-coment">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book.
                        </div>
                        <div className="footer-coment">
                            <div className="color-coment">
                                <i className="fas fa-gamepad"></i>
                            </div>
                            <div className="info-footer">
                                <h3>sobre</h3>
                                <p>Pantera Negra</p>
                            </div>
                        </div>
                    </div>
                    <div className="coment">
                        <div className="header-coment">
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
                        <div className="content-coment">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book.
                        </div>
                        <div className="footer-coment">
                            <div className="color-coment">
                                <i className="fas fa-gamepad"></i>
                            </div>
                            <div className="info-footer">
                                <h3>sobre</h3>
                                <p>Pantera Negra</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User