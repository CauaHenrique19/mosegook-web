import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../../context/context'
import api from '../../services/api'
import './login.css'

const Login = () => {

    const history = useHistory()
    const { setUser, setToken } = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [viewPassword, setViewPassword] = useState(false)

    function handleLogin(){
        const login = { email, password }
        
        api.post('/login', login)
            .then(res => {
                if(res.data.auth){
                    localStorage.setItem('mosegook_user', JSON.stringify(res.data.user))
                    localStorage.setItem('mosegook_token', res.data.token)
                    setUser(res.data.user)
                    setToken(res.data.token)
                    history.push('/timeline')
                }
                else{
                    console.log(res.data.message)
                }
            })
            .catch(error => console.error(error.message))
    }
    
    return (
        <div className="container-login">
            <div className="form-container">
                <header>
                    <h1>Mosegook</h1>
                </header>
                <div className="form">
                    <h1>Bem Vindo!</h1>
                    <label htmlFor="input-container">Email</label>
                    <div className="input-container">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" placeholder="email@email.com" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <label htmlFor="input-container">Senha</label>
                    <div className="input-container">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type={viewPassword ? "text" : "password"} placeholder="Senha" onChange={e => setPassword(e.target.value)} />
                        <ion-icon name={viewPassword ? "eye-off-outline" : "eye-outline"} onClick={() => setViewPassword(!viewPassword)}></ion-icon>
                    </div>
                    <div className="form-button-container">
                        <button onClick={handleLogin}>Entrar</button>
                        <Link to="signup">Não tem uma conta? Cadastre-se</Link>
                    </div>
                </div>
            </div>
            <div className="social-media-container">
                <h1>Visite Nossas Redes Sociais</h1>
                <div className="buttons-social-media">
                    <Link to="">
                        <ion-icon name="logo-facebook"></ion-icon>
                    </Link>
                    <Link to="">
                        <ion-icon name="logo-twitter"></ion-icon>
                    </Link>
                    <Link to="">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </Link>
                    <Link to="">
                        <ion-icon name="logo-whatsapp"></ion-icon>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login