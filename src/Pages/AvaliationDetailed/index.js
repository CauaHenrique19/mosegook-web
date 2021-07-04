import React, { useEffect, useState } from 'react'
import './avaliationDetailed.css'

const AvaliationDetailed = (props) => {

    const [avaliationId, setAvaliationId] = useState(0)

    useEffect(() => {
        setAvaliationId(props.match.params.id)
    }, [props])

    return (
        <div className="avaliation-detail-container">
            <div className="avaliation-container">
                <div className="avaliation">
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
                    <div className="links-coment-container">
                        <button>
                            <ion-icon name="heart-outline"></ion-icon>
                        </button>
                    </div>
                </div>
                <div className="avaliations-coments-container">
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
                        <div className="links-coment-container">
                            <button>
                                <ion-icon name="heart-outline"></ion-icon>
                            </button>
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
                        <div className="links-coment-container">
                            <button>
                                <ion-icon name="heart-outline"></ion-icon>
                            </button>
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
                        <div className="links-coment-container">
                            <button>
                                <ion-icon name="heart-outline"></ion-icon>
                            </button>
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
                        <div className="links-coment-container">
                            <button>
                                <ion-icon name="heart-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="media-avaliation-container">
                <h1>Mídia Avaliada</h1>
                <div className="media">
                    <div className="media-image-container">
                        <img src="../home/poster-pantera-negra.jpg" alt="" />
                    </div>
                    <div className="media-info-container">
                        <h3>Pantera Negra</h3>
                    </div>
                </div>
                <h1>Gêneros</h1>
                <div className="genders-avaliation-container">
                    <div className="gender-avaliation-container">Drama</div>
                    <div className="gender-avaliation-container">Drama</div>
                    <div className="gender-avaliation-container">Drama</div>
                    <div className="gender-avaliation-container">Drama</div>
                </div>
            </div>
        </div>
    )
}

export default AvaliationDetailed