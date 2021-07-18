import React from 'react'
import './message.css'

const Message = ({ message }) => {
    return (
        <div className="message">
            <h2>{message}</h2>
        </div>
    )
}

export default Message