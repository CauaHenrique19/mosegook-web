import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context/context'
import api from '../../services/api'
import './modalForm.css'

const ModalForm = ({ page, type, data }) => {

    const { viewModalForm, setViewModalForm } = useContext(Context)
    const [categories, setCategories] = useState([])
    const [genders, setGenders] = useState([])

    const [id, setId] = useState(data.id)
    const [name, setName] = useState(data.name)
    const [synopsis, setSynopsis] = useState(data.synopsis)
    const [avaliation, setAvaliation] = useState(data.avaliation)
    const [categoryId, setCategoryId] = useState(data.category_id)
    const [gendersMedia, setGendersMedia] = useState(data.genders)
    const [poster, setPoster] = useState(null)
    const [posterTimeline, setPosterTimeline] = useState(null)

    const fileInputPoster = useRef(null)
    const fileInputPosterTimeline = useRef(null)

    useEffect(() => {
        if(type === "form-media"){
            api('/categories')
                .then(res => setCategories(res.data))
                .catch(error => console.error(error.message))

            api('/genders')
                .then(res => setGenders(res.data))
                .catch(error => console.error(error.message))
        }
    }, [])

    useEffect(() => {
        const media = { 
            name, 
            synopsis, 
            avaliation, 
            categoryId, 
            poster: poster || data.url_poster, 
            posterTimeline: posterTimeline || data.url_poster_timeline,
            genders: gendersMedia
        }
        console.log(media)
    }, [name, synopsis, avaliation, categoryId, poster, posterTimeline, gendersMedia])

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
        const mediaFormData = new FormData()
        mediaFormData.append('name', name)
        mediaFormData.append('synopsis', synopsis)
        mediaFormData.append('avaliation', avaliation)
        mediaFormData.append('category_id', categoryId)
        mediaFormData.append('poster', poster || data.url_poster)
        mediaFormData.append('poster_timeline', posterTimeline || data.url_poster_timeline)
        mediaFormData.append('genders', JSON.stringify(gendersMedia))

        api.put(`/medias/${id}`, mediaFormData)
            .then(res => console.log(res))
            .catch(error => console.error(error.message))
    }

    return (
        <div className="modal-form-container">
            <div className={`content-modal-form-container ${type}`}>
                <div className="header-modal-form">
                    <h1>{page}</h1>
                    <button onClick={() => setViewModalForm(!viewModalForm)}><ion-icon name="close-outline"></ion-icon></button>
                </div>
                <div className={`main-modal-form ${type}`}>
                    {
                        type === "confirm" && 
                        <div className="confirm-container">
                            <h2>Tem certeza que deseja excluir?</h2>
                            <div>
                                <button>Remover</button>
                                <button onClick={() => setViewModalForm(false)}>Cancelar</button>
                            </div>
                        </div>
                    }
                    {
                        type === "form-gender" &&
                        <div className="form-gender-container">
                            <div className="row-form">
                                <div className="input-container">
                                    <label htmlFor="name">Nome</label>
                                    <input type="text" id="name" />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="color">Cor</label>
                                    <input type="color" id="color" />
                                </div>
                            </div>
                            <div className="buttons-container">
                                <button>Editar</button>
                                <button onClick={() => setViewModalForm(false)}>Canelar</button>
                            </div>
                        </div>
                    }
                    {
                        type === "form-media" &&
                        <div className="form-media-container">
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
                                    <img src={poster ? URL.createObjectURL(poster) : `${data.url_poster}?${Date.now()}`} alt="Poster" id="poster" />
                                    <div className="button-container">
                                        <button onClick={() => fileInputPoster.current && fileInputPoster.current.click() }>
                                            <ion-icon name="create-outline"></ion-icon>
                                        </button>
                                        {poster && <button onClick={() => setPoster(null)}><ion-icon name="close-outline"></ion-icon></button>}
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
                                    <img src={posterTimeline ? URL.createObjectURL(posterTimeline) : `${data.url_poster_timeline}?${Date.now()}`} alt="Poster Timeline" id="poster" />
                                    <div className="button-container">
                                        <button onClick={() => fileInputPosterTimeline.current && fileInputPosterTimeline.current.click() }>
                                            <ion-icon name="create-outline"></ion-icon>
                                        </button>
                                        {posterTimeline && <button onClick={() => setPosterTimeline(null)}><ion-icon name="close-outline"></ion-icon></button>}
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
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalForm