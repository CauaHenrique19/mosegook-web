import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import Loading from '../../Components/Loading'
import './selectGenders.css'

const SelectGenders = () => {
    
    const history = useHistory()
    const { user } = useContext(Context)

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

        console.log(user)
    }, [])

    function handleNextPage(){
        const gendersPreferences = {
            user_id: user.id,
            gender_id: selectedGenders.map(selectedGender => selectedGender.id)
        }

        api.post('/user-preferences-genders', gendersPreferences)
            .then(res => {
                console.log(res.data)
                history.push('/select-medias')
            })
            .catch(error => console.error(error.message))   
    }

    return (
        <div className="genders-container">
            { loading && <Loading />}
            <header>
                <h1>Mosegook</h1>
                { selectedGenders.length >= 3 && <button onClick={handleNextPage}>Próximo<ion-icon name="arrow-forward-outline"></ion-icon></button> }
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
                                    <div key={selectedGender.id} style={{ backgroundColor: selectedGender.color }}  className="gender selected">
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