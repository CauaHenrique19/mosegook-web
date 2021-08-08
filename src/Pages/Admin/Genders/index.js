import React, { useEffect, useState } from 'react'
import MenuAdmin from '../../../Components/MenuAdmin'
import Loading from '../../../Components/Loading'
import api from '../../../services/api'
import './style.css'

const Genders = () => {

    const [filteredGenders, setFilteredGenders] = useState([])
    const [genders, setGenders] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewModal, setViewModal] = useState(false)
    const [statistics, setStatistics] = useState()

    const [idGender, setIdGender] = useState(0)
    const [nameGender, setNameGender] = useState('')
    const [colorGender, setColorGender] = useState('')

    useEffect(() => {
        api.get('/genders')
            .then(res => {
                setFilteredGenders(res.data)
                setGenders(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))

        api.get('/genders/statistics')
            .then(res => setStatistics(res.data))
            .catch(error => console.error(error.message))

        console.log(statistics)
    }, [])

    function handleSearch(search){
        const gendersSearched = genders.filter(gender => gender.name.toLowerCase().includes(search))
        setFilteredGenders(gendersSearched)
    }

    function handleEdit(){
        const gender = { name: nameGender, color: colorGender }
        console.log(gender)
    }

    return (
        <div className="genders-admin-container">
            { loading && <Loading /> }
            { 
                viewModal && 
                <div className="modal">
                    <div className="modal-content">
                        <div className="header-modal">
                            <h1>Editar Gênero</h1>
                            <button onClick={() => setViewModal(false)} ><ion-icon name="close-outline"></ion-icon></button>
                        </div>
                        <div className="content">
                            <div className="input-container">
                                <h2>Nome</h2>
                                <input type="text" placeholder="Nome" value={nameGender} onChange={e => setNameGender(e.target.value)} />
                            </div>
                            <div className="input-container">
                                <h2>Cor</h2>
                                <div>
                                    <input type="color" value={colorGender} onChange={e => setColorGender(e.target.value)} />
                                    <h2>{colorGender}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="buttons-modal">
                            <button onClick={() => handleEdit()}>Salvar</button>
                            <button onClick={() => setViewModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div> 
            }
            <MenuAdmin page="genders" />
            <div className="main-genders-container">
                <div className="statistics-genders-main-container">
                    <div className="statistic">
                        <div>
                            {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.amount_genders}</h1>
                                    <h2 className="statistic-description">Gêneros</h2>
                                </>
                            }
                        </div>
                        <div>
                            <ion-icon name="bookmark-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.gender_most_popular.name}</h1>
                                    <h2 className="statistic-description">Gênero Preferido</h2>
                                </>
                            }
                        </div>
                        <div>
                            <ion-icon name="heart-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.gender_most_utilized.name}</h1>
                                    <h2 className="statistic-description">Gênero mais utilizado</h2>
                                </>
                            }
                        </div>
                        <div>
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="genders-main-container">
                    <div className="header-genders-main-container">
                        <h1>Gêneros</h1>
                        <div>
                            <div className="input-container">
                                <input onChange={e => handleSearch(e.target.value)} type="text" placeholder="Pesquisar" />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <button>
                                <ion-icon name="add-outline"></ion-icon>
                                Novo gênero
                            </button>
                        </div>
                    </div>
                    <div className="genders">
                        {
                            filteredGenders.length > 0 ? filteredGenders.map(gender => (
                                <div key={gender.id} className="gender">
                                    <div className="gender-id">
                                        <h2>{gender.id}</h2>
                                    </div>
                                    <div className="gender-name">
                                        <h2 style={{ backgroundColor: gender.color }} >{gender.name}</h2>
                                    </div>
                                    <div className="gender-color">
                                        <div style={{ backgroundColor: gender.color }} className="color"></div>
                                        <h2>{gender.color}</h2>
                                    </div>
                                    <div className="buttons">
                                        <button 
                                            onClick={() => {
                                                setViewModal(true)
                                                setIdGender(gender.id)
                                                setColorGender(gender.color)
                                                setNameGender(gender.name)
                                            }}>
                                            <ion-icon name="create-outline"></ion-icon>
                                            Editar
                                        </button>
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

export default Genders