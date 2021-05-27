import axios from 'axios'

const instance = axios.create({
    baseURL:'https://my-burgur.firebaseio.com/'
})

export default instance