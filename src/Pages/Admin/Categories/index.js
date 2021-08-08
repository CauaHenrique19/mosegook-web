import React, { useEffect, useState } from 'react'
import MenuAdmin from '../../../Components/MenuAdmin'
import Loading from '../../../Components/Loading'
import api from '../../../services/api'
import './style.css'

const Categories = () => {

    const [categories, setCategories] = useState([])
    const [statistics, setStatistics] = useState()

    const [idCategory, setIdCategory] = useState(0)
    const [nameCategory, setNameCategory] = useState('')
    const [colorCategory, setColorCategory] = useState('')
    const [iconCategory, setIconCategory] = useState('')

    const [viewModal, setViewModal] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/categories')
            .then(res => {
                setCategories(res.data)
                setLoading(false)
            })

        api.get('/categories/statistics')
            .then(res => setStatistics(res.data))
            .catch(error => console.error(error.message))
    }, [])

    function handleSubmit(){
        const category = { name: nameCategory, color: colorCategory, icon: iconCategory }

        api.put(`/categories/${idCategory}`, category)
            .then(res => {
                const categoryRemove = categories.find(category => category.id === res.data[0].id)
                categories.splice(categories.indexOf(categoryRemove), 1)
                categories.push(res.data[0])
                setCategories([...categories])
                setViewModal(false)
            })
            .catch(error => console.error(error.message))

    }

    return (
        <div className="categories-admin-container">
            { loading && <Loading /> }
            { 
                viewModal && 
                <div className="modal">
                    <div className="modal-content">
                        <div className="header-modal">
                            <h1>Editar Gênero</h1>
                            <button onClick={() => setViewModal(false)}><ion-icon name="close-outline"></ion-icon></button>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="input-container">
                                    <h2>Nome</h2>
                                    <input type="text" placeholder="Nome" value={nameCategory} onChange={e => setNameCategory(e.target.value)} />
                                </div>
                                <div className="input-container">
                                    <h2>Cor</h2>
                                    <div>
                                        <input type="color" value={colorCategory} onChange={e => setColorCategory(e.target.value)} />
                                        <h2>{colorCategory}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="input-container">
                                <h2>Ícone</h2>
                                <div>
                                    <input type="text" value={iconCategory} onChange={e => setIconCategory(e.target.value)} />
                                    <ion-icon name={iconCategory}></ion-icon>
                                </div>
                            </div>
                        </div>
                        <div className="buttons-modal">
                            <button onClick={() => handleSubmit()}>Salvar</button>
                            <button onClick={() => setViewModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div> 
            }
            <MenuAdmin page="categories" />
            <div className="main-categories-container">
                <div className="statistics-categories-main-container">
                    <div className="statistic">
                        <div>
                            {
                                statistics != null && 
                                <>
                                    <h1 className="number-statisc">{statistics.amount_movies}</h1>
                                    <h2 className="statistic-description">Filmes</h2>
                                </>
                            }
                        </div>
                        <div>
                            <ion-icon name="film-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {
                                statistics != null &&
                                <>
                                    <h1 className="number-statisc">{statistics.amount_series}</h1>
                                    <h2 className="statistic-description">Séries</h2>
                                </>
                            }
                        </div>
                        <div>
                            <ion-icon name="videocam-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {
                                statistics != null &&
                                <>
                                    <h1 className="number-statisc">{statistics.amount_books}</h1>
                                    <h2 className="statistic-description">Livros</h2>
                                </>
                            }
                        </div>
                        <div>
                            <ion-icon name="book-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            {
                                statistics != null &&
                                <>
                                    <h1 className="number-statisc">{statistics.amount_games}</h1>
                                    <h2 className="statistic-description">Jogos</h2>
                                </>
                            }
                        </div>
                        <div>
                            <ion-icon name="game-controller-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="categories-main-container">
                    <div className="header-categories-main-container">
                        <h1>Categorias</h1>
                    </div>
                    <div className="categories">
                        {
                            categories.length > 0 && categories.map(category => (
                                <div key={category.id} className="category">
                                    <div className="category-id">
                                        <h2>{category.id}</h2>
                                    </div>
                                    <div className="category-name">
                                        <h2 style={{ backgroundColor: category.color }} >{category.name}</h2>
                                    </div>
                                    <div className="category-color">
                                        <div style={{ backgroundColor: category.color }} className="color"></div>
                                        <h2>{category.color}</h2>
                                    </div>
                                    <div className="category-icon">
                                        <ion-icon name={category.icon}></ion-icon>
                                        <h2>{category.icon}</h2>
                                    </div>
                                    <div className="buttons">
                                        <button 
                                            onClick={() => {
                                                setViewModal(true)
                                                setIdCategory(category.id)
                                                setColorCategory(category.color)
                                                setNameCategory(category.name)
                                                setIconCategory(category.icon)
                                            }}>
                                            <ion-icon name="create-outline"></ion-icon>
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories