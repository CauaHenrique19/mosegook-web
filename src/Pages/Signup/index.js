import React, { useState, useRef, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../../context/context'
import api from '../../services/api'
import './signup.css'

const Signup = () => {

    const history = useHistory()
    const { setUser, setToken } = useContext(Context)

    const [name, setName] = useState('')
    const [user, setUserSignup] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('')
    const [imageSelected, setImageSelected] = useState(null)

    const [viewPassword, setViewPassword] = useState(false)
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

    const fileInput = useRef(null)

    function handleSignup(){
        const userSignupFormData = new FormData()
        userSignupFormData.append('name', name)
        userSignupFormData.append('user', user)
        userSignupFormData.append('email', email)
        userSignupFormData.append('password', password)
        userSignupFormData.append('confirmPassword', confirmPassword)
        userSignupFormData.append('gender', gender)
        userSignupFormData.append('file', imageSelected)

        api.post('/signup', userSignupFormData)
            .then(res => {
                if(res.data.auth){
                    localStorage.setItem('mosegook_user', JSON.stringify(res.data.userDb[0]))
                    localStorage.setItem('mosegook_token', res.data.token)
                    setUser(res.data.userDb[0])
                    setToken(res.data.token)
                    history.push('/select-genders')
                }
                else{
                    console.log(res.data.message)
                }
            })
            .catch(error => console.error(error.message))
    }

    return (
        <div className="container-signup">
            <div className="form-container">
                <header>
                    <h1>Mosegook</h1>
                </header>
                <div className="form">
                    <div className="inputs-form">
                        <h1>Você está muito perto de começar!</h1>
                        <div className="form-row">
                            <div>
                                <label htmlFor="input-container">Nome</label>
                                <div className="input-container">
                                    <ion-icon name="person-outline"></ion-icon>
                                    <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="input-container">User</label>
                                <div className="input-container">
                                    <ion-icon name="at-outline"></ion-icon>
                                    <input type="text" onChange={(e) => setUserSignup(e.target.value)} placeholder="Seu user" />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label htmlFor="input-container">Email</label>
                                <div className="input-container">
                                    <ion-icon name="mail-outline"></ion-icon>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email@email.com" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="input-container">Senha</label>
                                <div className="input-container">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                    <input type={viewPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" />
                                    <ion-icon name={viewPassword ? "eye-off-outline" : "eye-outline"} onClick={() => setViewPassword(!viewPassword)}></ion-icon>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label htmlFor="input-container">Confirme sua senha</label>
                                <div className="input-container">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                    <input type={viewConfirmPassword ? "text" : "password"} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme sua senha" />
                                    <ion-icon name={viewConfirmPassword ? "eye-off-outline" : "eye-outline"} onClick={() => setViewConfirmPassword(!viewConfirmPassword)} ></ion-icon>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="input-container">Qual seu sexo?</label>
                                <div className="input-container">
                                    <ion-icon name="transgender-outline"></ion-icon>
                                    <select onChange={(e) => setGender(e.target.value)} >
                                        <option value="">Escolha seu sexo</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Outros">Outros</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-button-container">
                            <button onClick={handleSignup}>Cadastrar</button>
                            <Link to="login">Já tem uma conta?Entre aqui</Link>
                        </div>
                    </div>
                    <div className="image-input">
                        <h1>Foto de Perfil</h1>
                        <div className="image-form" onClick={() => fileInput.current && fileInput.current.click()}>
                            { !imageSelected && <ion-icon name="image-outline"></ion-icon> }
                            { !imageSelected && <h1>Clique para selecionar uma imagem de perfil</h1> }
                            { imageSelected && <img src={URL.createObjectURL(imageSelected)} alt="ImageUser" /> }
                        </div>
                        <input ref={fileInput} onChange={(e) => setImageSelected(e.target.files[0])} type="file" hidden={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup