import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Loading from '../../Components/Loading'
import './selectGenders.css'

const SelectGenders = () => {

    const [genders, setGenders] = useState([])
    const [selectedGenders, setSelectedGenders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/genders')
            .then(res => {
                setGenders(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error.message))
    }, [])

    return (
        <div className="genders-container">
            { loading && <Loading />}
            <header>
                <h1>Mosegook</h1>
                { selectedGenders.length >= 1 && <Link to="/select-medias">Próximo<ion-icon name="arrow-forward-outline"></ion-icon></Link> }
            </header>
            <div className="main-genders">
                <div className="right-container">
                    <h1>Selecione no mínimo 3 gêneros que você goste.</h1>
                    <h3>Quanto mais gêneros selecionados, mais preenchida será sua timeline</h3>
                    <div className="selected-genders">
                        { selectedGenders.length >= 1 && <h1>Gêneros Selecionados</h1> }
                        <div className="genders">
                            {
                                selectedGenders && selectedGenders.map(selectedGender => (
                                    <div style={{ backgroundColor: selectedGender.color }}  className="gender selected">
                                        {selectedGender.name}
                                        <button onClick={() => {
                                            selectedGenders.splice(selectedGenders.indexOf(selectedGender), 1)
                                            setSelectedGenders([...selectedGenders])
                                        }}><ion-icon name="close-outline"></ion-icon></button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="genders">
                    {
                        genders && genders.map(gender => (
                            <div
                                aria-disabled={selectedGenders.includes(gender)} 
                                key={gender.id} 
                                onClick={() => setSelectedGenders([...selectedGenders, gender])} 
                                style={{ backgroundColor: gender.color }} 
                                className={selectedGenders.includes(gender) ? "gender disabled" : "gender"}>
                                    {gender.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectGenders