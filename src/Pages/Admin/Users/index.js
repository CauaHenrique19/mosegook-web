import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import MenuAdmin from '../../../Components/MenuAdmin'
import Loading from '../../../Components/Loading'
import api from '../../../services/api'
import './style.css'

const Users = () => {

    const { user, token } = useContext(Context)

    const [filteredUsers, setFilteredUsers] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewModal, setViewModal] = useState(false)
    const [userSelected, setUserSelected] = useState([])
    const [admin, setAdmin] = useState(userSelected.admin)
    const [statistics, setStatistics] = useState(null)

    useEffect(() => {
        api.get('/users')
            .then(res => {
                setFilteredUsers(res.data)
                setUsers(res.data)
                setLoading(false)
            })
            .catch(error => console.log(error.message))

        api.get('/users/statistics')
            .then(res => setStatistics(res.data))
            .catch(error => console.log(error.message))
    }, [])

    useEffect(() => {
        console.log(statistics)
    }, [statistics])

    function handleSearch(search){
        const userSearched = users.filter(user => user.name.toLowerCase().includes(search))
        setFilteredUsers(userSearched)
    }

    function handleSetAdmin(){
        const data = { admin, user_id: userSelected.id }
        const headers = {headers: { admin_id: user.id, token }}

        api.put('/users/admin', data, headers)
            .then(res => {
                const user = users.find(user => user.id === res.data[0].id)
                users.splice(users.indexOf(user), 1)
                users.push(res.data[0])
                setUsers([...users])
                setFilteredUsers([...users])
                setViewModal(false)
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="users-admin-container">
            { loading && <Loading /> }
            { 
                viewModal && 
                <div className="modal">
                    <div className="modal-content">
                        <div className="header-modal">
                            <h1>Editar Usuário</h1>
                            <button onClick={() => setViewModal(false)} ><ion-icon name="close-outline"></ion-icon></button>
                        </div>
                        <div className="content">
                            <h2>Administrador</h2>
                            <div className="check">
                                <input type="checkbox" checked={admin} onChange={e => setAdmin(!admin)} />
                                <p>Concecer permissão de administrador</p>
                            </div>
                        </div>
                        <button onClick={() => handleSetAdmin()}>Salvar</button>
                    </div>
                </div> 
            }
            <MenuAdmin page={'users'} />
            <div className="main-users-container">
                <div className="statistics-users-main-container">
                    <div className="statistic">
                        <div>
                            {
                                statistics != null && 
                                <>                                
                                    <h1 className="number-statisc">{statistics.amount_users}</h1>
                                    <h2 className="statistic-description">Usuários</h2>
                                </>
                            }
                        </div>
                        <div>
                            <ion-icon name="person-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.amount_admins}</h1>
                                    <h2 className="statistic-description">Administradores</h2>
                                </>
                            }
                        </div>
                        <div>
                            <ion-icon name="settings-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="users-main-container">
                    <div className="header-users-main-container">
                        <h1>Usuários</h1>
                        <div>
                            <div className="input-container">
                                <input onChange={e => handleSearch(e.target.value)} type="text" placeholder="Pesquisar" />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                        </div>
                    </div>
                    <div className="users">
                        {
                            filteredUsers.length > 0 ? filteredUsers.map(user => (
                                <div key={user.url_image} className="user">
                                    <div className="user-info" >
                                        <div className="image-container">
                                            <img src={user.url_image} alt={user.user} />
                                        </div>
                                        <div className="info">
                                            <h2>{user.name}</h2>
                                            <h2>@{user.user}</h2>
                                        </div>
                                    </div>
                                    <div className="user-email">
                                        <h2>{user.email}</h2>
                                    </div>
                                    <div className="user-admin">
                                        <h2>{user.admin ? 'Administrador' : 'Usuário'}</h2>
                                    </div>
                                    <div className="buttons">
                                        <button onClick={() => { 
                                            setViewModal(true)
                                            setUserSelected(user)
                                            setAdmin(user.admin)
                                        }}><ion-icon name="create-outline"></ion-icon>Editar</button>
                                    </div>
                                </div>
                            )) :
                            <div className="nothing-container" >
                                <h1>Nenhum resultado encontrado!</h1>
                                <p>Tente usar outra palavra para pesquisar e se encontrarmos um resultado mostraremos aqui!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users