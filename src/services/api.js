import axios from 'axios'

const api = axios.create({
    baseURL: 'https://mosegook.herokuapp.com/',
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    validateStatus: () => true
})

export default api