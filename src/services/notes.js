import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/notes'
const baseUrl = 'https://node-notes.up.railway.app/api/notes'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}



const notesService = { getAll, create, update }
export default notesService