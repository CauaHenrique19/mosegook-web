import React, { useEffect, useState, useRef } from 'react'

import Media from '../../../Components/Media'
import MenuAdmin from '../../../Components/MenuAdmin'
import Loading from '../../../Components/Loading'

import api from '../../../services/api'
import './medias.css'

const Medias = ({ category_id, page, texts, pageName }) => {

    const [filteredMedias, setFilteredMedias] = useState([])
    const [medias, setMedias] = useState([])
    const [loading, setLoading] = useState(true)
    const [amountAvaliations, setAmountAvaliations] = useState([])
    const [mostRated, setMostRated] = useState([])
    const [mostGoodRated, setMostGoodRated] = useState([])
    
    const [viewModal, setViewModal] = useState(false)
    const [viewModalUpload, setViewModalUpload] = useState(false)

    const [categories, setCategories] = useState([])
    const [genders, setGenders] = useState([])

    const [percentualUpload, setPercentualUpload] = useState(0)

    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [avaliation, setAvaliation] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [gendersMedia, setGendersMedia] = useState([])

    const [poster, setPoster] = useState({})
    const [posterTimeline, setPosterTimeline] = useState({})

    const fileInputPoster = useRef(null)
    const fileInputPosterTimeline = useRef(null)

    useEffect(() => {
        api(`/medias/${category_id}`)
            .then(res => {
                setMedias(res.data)
                setFilteredMedias(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))

        api(`/medias/statistics/${category_id}`)
            .then(res => {
                setAmountAvaliations(res.data.amountAvaliations)
                setMostRated(res.data.mostRated)
                setMostGoodRated(res.data.mostGoodRated)
            })
            .catch(error => console.error(error.message))

        api('/categories')
            .then(res => setCategories(res.data))
            .catch(error => console.error(error.message))

        api('/genders')
            .then(res => setGenders(res.data))
            .catch(error => console.error(error.message))
    }, [category_id])

    function handleSearch(search){
        const mediasSearched = medias.filter(media => media.name.toLowerCase().includes(search))
        setFilteredMedias(mediasSearched)
    }

    function handleRemoveGender(e){
        const gender = gendersMedia.findIndex(gender => gender.id === e.id)
        gendersMedia.splice(gender, 1)
        setGendersMedia([...gendersMedia])
    }

    function handleSelectGender(e){
        const gender = genders.find(gender => gender.id === parseInt(e.target.value))
        const hasGender = gendersMedia.map(gender => gender.id).includes(gender.id)
        !hasGender && setGendersMedia([...gendersMedia, gender]) 
    }

    function handleSubmit(){

        const gendersId = gendersMedia.map(gender => gender.gender_id ? gender.gender_id : gender.id)
        const mediaFormData = new FormData()

        mediaFormData.append('name', name)
        mediaFormData.append('synopsis', synopsis)
        mediaFormData.append('avaliation', avaliation)
        mediaFormData.append('category_id', categoryId)
        mediaFormData.append('poster', poster)
        mediaFormData.append('poster_timeline', posterTimeline)
        mediaFormData.append('genders', JSON.stringify(gendersId))

        if(id != 0){
            api.put(`/medias/${id}`, mediaFormData, { onUploadProgress: (e) => handleProgressUpload(e) })
                .then(res => {
                    const mediaRemove = medias.find(media => media.id === res.data[0].id)
                    res.data[0].url_poster = `${res.data[0].url_poster}?${Date.now()}`
                    res.data[0].url_poster_timeline = `${res.data[0].url_poster_timeline}?${Date.now()}`
                    medias.splice(medias.indexOf(mediaRemove), 1)
                    medias.push(res.data[0])
                    setMedias([...medias])
                    setFilteredMedias([...medias])
                })
                .catch(error => console.error(error.message))
        }
        else{
            api.post('/medias', mediaFormData, { onUploadProgress: (e) => handleProgressUpload(e) })
                .then(res => {
                    const media = res.data[0]
                    setMedias([...medias, media])
                    setFilteredMedias([...medias, media])
                })
                .catch(error => console.error(error.message))
        }
    }

    function handleProgressUpload(e){
        setViewModalUpload(true)
        setViewModal(false)
        setPercentualUpload(parseInt(Math.round(e.loaded * 100) / e.total))
    }

    function handleDelete(id){
        api.delete(`/medias/${id}`, { onUploadProgress: (e) => handleProgressUpload(e) })
            .then(res => {
                if(res.data.error){

                }
                else{
                    const mediaRemove = medias.find(media => media.id === id)
                    medias.splice(medias.indexOf(mediaRemove), 1)
                    setMedias([...medias])
                    setFilteredMedias([...medias])
                }
            })
    }

    return (
        <div className="medias-admin-container">
            { loading && <Loading /> }
            {
                viewModal &&
                <div className="modal">
                    <div className="modal-content">
                        <div className="header-modal">
                            <h1>{ id != 0 ? ' Edição de Mídia' : 'Nova mídia' }</h1>
                            <button onClick={() => setViewModal(false)} ><ion-icon name="close-outline"></ion-icon></button>
                        </div>
                        <div className="form-content">
                            <div className="row-form">
                                <div className="input-container">
                                    <label htmlFor="name">Nome</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome" id="name" />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="category">Categoria</label>
                                    <select name="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} id="category">
                                        <option value="">Selecione um gênero</option>
                                        {categories && categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                                    </select>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="avaliation">Avaliação</label>
                                    <input type="number" value={avaliation} onChange={(e) => setAvaliation(e.target.value)} placeholder="Avaliação" id="avaliation" />
                                </div>
                            </div>
                            <div className="row-form">
                                <div className="poster-container">
                                    <label htmlFor="poster">Poster</label>
                                    <img src={poster.name ? URL.createObjectURL(poster) : `${poster}?${Date.now()}`} alt="Poster" id="poster" />
                                    <div className="button-container">
                                        <button onClick={() => fileInputPoster.current && fileInputPoster.current.click() }>
                                            <ion-icon name="create-outline"></ion-icon>
                                        </button>
                                        {poster && <button onClick={() => setPoster({})}><ion-icon name="close-outline"></ion-icon></button>}
                                    </div>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="synopsis">Sinopse</label>
                                    <textarea name="synopsis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} id="synopsis" cols="30" rows="10" placeholder="Sinopse"></textarea>
                                </div>
                            </div>
                            <div className="row-form">
                                <div className="poster-timeline-container">
                                    <label htmlFor="poster">Poster Timeline</label>
                                    <img src={posterTimeline.name ? URL.createObjectURL(posterTimeline) : `${posterTimeline}?${Date.now()}`} alt="Poster Timeline" id="poster" />
                                    <div className="button-container">
                                        <button onClick={() => fileInputPosterTimeline.current && fileInputPosterTimeline.current.click() }>
                                            <ion-icon name="create-outline"></ion-icon>
                                        </button>
                                        {posterTimeline && <button onClick={() => setPosterTimeline({})}><ion-icon name="close-outline"></ion-icon></button>}
                                    </div>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="genders">Gêneros</label>
                                    <select name="genders" id="genders" value={genders.id} onChange={(e) => handleSelectGender(e)}>
                                        <option value="">Selecione um gênero</option>
                                        {genders && genders.map(gender => <option key={gender.color} value={gender.id}>{gender.name}</option>)} 
                                    </select>
                                    <div className="genders-input-container">
                                        {
                                            gendersMedia.length > 0 && gendersMedia.map(gender => (
                                                <div style={{ backgroundColor: gender.color }} key={gender.name} className="gender-input-container">
                                                    <p>{gender.name}</p>
                                                    <button onClick={() => handleRemoveGender(gender)}><ion-icon name="close-outline"></ion-icon></button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <input 
                                    type="file" 
                                    name="poster" 
                                    id="poster" 
                                    hidden={true} 
                                    onChange={e => setPoster(e.target.files[0])} 
                                    ref={fileInputPoster} 
                                />
                                <input 
                                    type="file" 
                                    name="poster_timeline" 
                                    id="poster_timeline" 
                                    hidden={true} 
                                    onChange={e => setPosterTimeline(e.target.files[0])}
                                    ref={fileInputPosterTimeline}
                                />
                            </div>
                            <div className="row-form">
                                <button onClick={() => handleSubmit()}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                viewModalUpload && 
                <div className="modal">
                    <div className="modal-content upload">
                        {
                            percentualUpload !== 100 ? 
                            <ion-icon className="rotate" name="hourglass-outline"></ion-icon>
                            :
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                        }
                        {
                            percentualUpload !== 100 ? 
                            <h1>Enviando...</h1> :
                            <h1>Enviado com sucesso!</h1>
                        }
                        {
                            percentualUpload != 100 ? 
                            <div className="progress">
                                <div style={{ width: `${percentualUpload}%` }} className="progress-content"></div>
                            </div> 
                            :
                            <button 
                                onClick={() => {
                                    setViewModal(false)
                                    setViewModalUpload(false)
                                }}>
                                Fechar
                            </button>
                        }
                    </div>
                </div>
            }
            <MenuAdmin page={page} />
            <div className="main-medias-container">
                <div className="statistics-medias-main-container">
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{medias.length}</h1>
                            <h2 className="statistic-description">{texts}</h2>
                        </div>
                        <div>
                            { page === "movies" && <ion-icon name="film-outline"></ion-icon> }
                            { page === "series" && <ion-icon name="videocam-outline"></ion-icon> }
                            { page === "books" &&  <ion-icon name="book-outline"></ion-icon> }
                            { page === "games" && <ion-icon name="game-controller-outline"></ion-icon> }
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{ amountAvaliations.length > 0 ? amountAvaliations[0].amount_avaliations : '0'}</h1>
                            <h2 className="statistic-description">{ amountAvaliations.length > 0 ? 'Avaliações' : 'Nenhuma'}</h2>
                        </div>
                        <div>
                            <ion-icon name="chatbox-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{ mostRated.length > 0 ? mostRated[0].amount_avaliations : '0'}</h1>
                            <h2 className="statistic-description">{ mostRated.length > 0 ? mostRated[0].name : 'Nenhuma' }</h2>
                        </div>
                        <div>
                            <ion-icon name="heart-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="statistic">
                        <div>
                            <h1 className="number-statisc">{ mostGoodRated.length > 0 ? mostGoodRated[0].media_stars.replace('.', ',') : '0'}</h1>
                            <h2 className="statistic-description">{ mostGoodRated.length > 0 ? mostGoodRated[0].name : 'Nenhuma' }</h2>
                        </div>
                        <div>
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="medias-main-container">
                    <div className="header-medias-main-container">
                        <h1>{texts}</h1>
                        <div>
                            <div className="input-container">
                                <input onChange={e => handleSearch(e.target.value)} type="text" placeholder="Pesquisar" />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <button onClick={() => { 
                                setViewModal(true)
                                setName('')
                                setSynopsis('')
                                setAvaliation(0)
                                setCategoryId(0)
                                setGendersMedia([])
                                setPoster({})
                                setPosterTimeline({})
                            }}>
                                <ion-icon name="add-outline"></ion-icon>
                                {pageName === "série" ? 'Nova série' : 'Novo ' + pageName}
                            </button>
                        </div>
                    </div>
                    {
                        filteredMedias.length === 0 && 
                        <div className="nothing-container">
                            <h1>Nenhum resultado encontrado!</h1>
                            <p>Tente usar outra palavra para pesquisar e se encontrarmos um resultado mostraremos aqui!</p>
                        </div>
                    }
                    <div className="medias">
                        {
                            filteredMedias.length > 0 && filteredMedias.map(media => (
                                <Media 
                                    key={media.id}
                                    media={media} 
                                    onEdit={() => {
                                        setViewModal(true)
                                        setId(media.id)
                                        setName(media.name)
                                        setSynopsis(media.synopsis)
                                        setAvaliation(media.avaliation)
                                        setCategoryId(media.category_id)
                                        setGendersMedia(media.genders)
                                        setPoster(media.url_poster)
                                        setPosterTimeline(media.url_poster_timeline)
                                    }}
                                    onDelete={() => handleDelete(media.id)}
                                    selectMedia={() => {}} 
                                    admin 
                                />
                            )) 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Medias