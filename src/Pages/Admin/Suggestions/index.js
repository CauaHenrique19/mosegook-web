import React from 'react'
import MenuAdmin from '../../../Components/MenuAdmin'
import './style.css'

const Suggestions = () => {
    return (
        <div className="suggestions-admin-container">
            <MenuAdmin page="suggestions" />
            <div className="main-suggestions-container">
            <div className="statistics-suggestions-main-container">
                    <div className="statistic">
                        <div>
                            {/* {
                                statistics != null && 
                                <>                                
                                    <h1 className="number-statisc">{statistics.amount_users}</h1>
                                    <h2 className="statistic-description">Usuários</h2>
                                </>
                            } */}
                            <h1 className="number-statisc">20</h1>
                            <h2 className="statistic-description">Sugestões</h2>
                        </div>
                        <div>
                            <ion-icon name="chatbubbles-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {/* {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.amount_admins}</h1>
                                    <h2 className="statistic-description">Administradores</h2>
                                </>
                            } */}
                            <h1 className="number-statisc">10</h1>
                            <h2 className="statistic-description">Sugestões aceitas</h2>
                        </div>
                        <div>
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {/* {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.amount_admins}</h1>
                                    <h2 className="statistic-description">Administradores</h2>
                                </>
                            } */}
                            <h1 className="number-statisc">10</h1>
                            <h2 className="statistic-description">Sugestões recusadas</h2>
                        </div>
                        <div>
                            <ion-icon name="close-circle-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {/* {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.amount_admins}</h1>
                                    <h2 className="statistic-description">Administradores</h2>
                                </>
                            } */}
                            <h1 className="number-statisc">10</h1>
                            <h2 className="statistic-description">Sugestões pendentes</h2>
                        </div>
                        <div>
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Suggestions