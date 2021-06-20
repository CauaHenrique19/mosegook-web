import React, { useState, createContext } from 'react'

export const Context = createContext()

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('mosegook_user')))
    const [token, setToken] = useState(localStorage.getItem('mosegook_token'))
    const [viewModalForm, setViewModalForm] = useState(false)

    return <Context.Provider value={{
        user, setUser,
        token, setToken,
        viewModalForm, setViewModalForm
    }}>
        {children}
    </Context.Provider>
}

export default ContextProvider