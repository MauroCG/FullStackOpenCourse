import axios from 'axios'

const baseUrl = 'https://young-scrubland-14527.herokuapp.com/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    const request = axios
        .put(`${baseUrl}/${id}`, newObject)
        
  return request.then(response => response.data)
}

const services = { getAll, create, update }

export default services