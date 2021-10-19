import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    //console.log('Fetching all data')
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (personId, newPerson) => {
    //console.log(personId, newPerson)
    const request = axios
        .put(`${baseUrl}/${personId}`, newPerson)

    return request.then(response => response.data)
}

const services = { getAll, addPerson, deletePerson, updatePerson }
export default services