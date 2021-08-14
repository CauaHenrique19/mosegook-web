import api from '../services/api'

function handleDeleteComent(coment, coments, setComents){
    api.delete(`/coments/${coment.id}`)
        .then(res => {
            const comentToRemove = coments.find(c => c.id === coment.id)
            coments.splice(coments.indexOf(comentToRemove), 1)
            setComents([...coments])
        })
        .catch(error => console.error(error.message))
}

export default handleDeleteComent