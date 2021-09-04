import React, { useEffect, useState } from 'react'

import Media from '../../Components/Media'
import Loading from '../../Components/Loading'

import api from '../../services/api'
import './catalog.css'

const Catalog = () => {

    const [loading, setLoading] = useState(true)
    const [medias, setMedias] = useState([])
    const [searchString, setSearchString] = useState()
    const [categoryId, setCategoryId] = useState(0)
    const [filteredMedias, setFilteredMedias] = useState([])

    useEffect(() => {
        api.get('/medias')
            .then(res => {
                setMedias(res.data)
                setFilteredMedias(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))
    }, [])

    function handleSearch(search){
        setCategoryId(0)
        setSearchString(search)
        const mediasSearched = medias.filter(media => media.name.toLowerCase().includes(search))
        setFilteredMedias(mediasSearched)
    }

    function handleSearchByCategory(categoryId){
        setCategoryId(categoryId)
        setSearchString("")
        const mediasSearched = medias.filter(media => media.category_id === categoryId)
        setFilteredMedias(mediasSearched)
    }

    return (
        <div className="catalog-container">
            { loading && <Loading /> }
            <div className="menu-catalog-container">
                <div className="logo-container">
                    <h1>Mosegook</h1>
                </div>
                <ul>
                    <button onClick={() => handleSearch('')} className={searchString || categoryId === 0 ? "menu-item selected" : "menu-item"}>
                        <ion-icon name="home-outline"></ion-icon>
                        <h2>Início</h2>
                    </button>
                    <button onClick={() => handleSearchByCategory(1)} className={categoryId === 1 && !searchString ? "menu-item selected" : "menu-item"}>
                        <ion-icon name="film-outline"></ion-icon>
                        <h2>Filmes</h2>
                    </button>
                    <button onClick={() => handleSearchByCategory(4)} className={categoryId === 4 ? "menu-item selected" : "menu-item"}>
                        <ion-icon name="videocam-outline"></ion-icon>
                        <h2>Séries</h2>
                    </button>
                    <button onClick={() => handleSearchByCategory(3)} className={categoryId === 3 ? "menu-item selected" : "menu-item"}>
                        <ion-icon name="book-outline"></ion-icon>
                        <h2>Livros</h2>
                    </button>
                    <button onClick={() => handleSearchByCategory(2)} className={categoryId === 2 ? "menu-item selected" : "menu-item"}>
                        <ion-icon name="game-controller-outline"></ion-icon>
                        <h2>Jogos</h2>
                    </button>
                </ul>
            </div>
            <div className="medias-catalog-container">
                <div className="header-medias-catalog-container">
                    <h1>Todas as nossas mídias</h1>
                    <div className="input-container">
                        <input type="text" placeholder="Pesquisar" onChange={e => handleSearch(e.target.value)} />
                        <ion-icon name="search-outline"></ion-icon>
                    </div>
                </div>
                {
                    searchString && filteredMedias.length > 0 &&
                    <div className="header-search-result">
                        <h1>Resultados para "{searchString}"</h1>
                    </div>
                }
                {
                    filteredMedias.length === 0 && !loading &&
                    <div className="not-result-container">
                        <h1>Nenhum Resultado para "{searchString}"</h1>
                        <p>Digite outro nome, talvez você encontre o que procura.</p>
                    </div>
                }
                <div className="medias-main-catalog-container">
                    {
                        filteredMedias.length > 0 && filteredMedias.map(media => (
                            <Media key={media.id} redirect selectMedia={() => {}} media={media} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Catalog