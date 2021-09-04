import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Media = ({ media, redirect, selectMedia, selected, removeMedia, miniature, admin, onEdit, onDelete }) => {
    return (
        <Link to={ redirect && `/media/${media.id}`} onClick={() => selectMedia()} className={selected ? 'media selected' : (miniature ? 'media miniature' : 'media')}>
            <div className="media-image-container">
                <img src={media.url_poster} alt={media.media_name || media.name} />
            </div>
            <div className="media-info-container">
                <h2>{media.name || media.media_name}</h2>
                {
                    admin &&
                    <div className="buttons-media-info-container">
                        <button onClick={onEdit}>
                            <ion-icon name="create-outline"></ion-icon>
                        </button>
                        <button onClick={onDelete}><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                }
            </div>
            {
                selected &&
                <button onClick={removeMedia}>
                    <ion-icon name="close-outline"></ion-icon>
                </button>
            }
        </Link>
    )
}

export default Media