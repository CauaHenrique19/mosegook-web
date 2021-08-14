import api from '../services/api'

function handleDeleteAvaliation(avaliation, avaliations, setAvaliations){
    api.delete(`/avaliations/${avaliation.id}`)
        .then(res => {
            console.log(res.data)
            const avaliationToRemove = avaliations.find(a => a.id === avaliation.id)
            avaliations.splice(avaliations.indexOf(avaliationToRemove), 1)
            setAvaliations([...avaliations])
        })
        .catch(error => console.error(error.message))
}

export default handleDeleteAvaliation