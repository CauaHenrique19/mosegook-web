import React from 'react'
import { Link } from 'react-router-dom'
import './signup.css'

const Signup = () => {
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
                                    <input type="text" placeholder="Seu nome" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="input-container">User</label>
                                <div className="input-container">
                                    <ion-icon name="at-outline"></ion-icon>
                                    <input type="text" placeholder="Seu user" />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label htmlFor="input-container">Email</label>
                                <div className="input-container">
                                    <ion-icon name="mail-outline"></ion-icon>
                                    <input type="email" placeholder="email@email.com" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="input-container">Senha</label>
                                <div className="input-container">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                    <input type="password" placeholder="Sua senha" />
                                    <ion-icon name="eye-outline"></ion-icon>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label htmlFor="input-container">Confirme sua senha</label>
                                <div className="input-container">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                    <input type="password" placeholder="Confirme sua senha" />
                                    <ion-icon name="eye-outline"></ion-icon>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="input-container">Qual seu sexo?</label>
                                <div className="input-container">
                                    <ion-icon name="transgender-outline"></ion-icon>
                                    <select>
                                        <option value="">Escolha seu sexo</option>
                                        <option value="">Masculino</option>
                                        <option value="">Feminino</option>
                                        <option value="">Outros</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-button-container">
                            <button>Cadastrar</button>
                            <Link to="login">Já tem uma conta?Entre aqui</Link>
                        </div>
                    </div>
                    <div className="image-input">
                        <h1>Foto de Perfil</h1>
                        <div className="image-form">
                            <ion-icon name="image-outline"></ion-icon>
                            <h1>Clique para selecionar uma imagem de perfil</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup