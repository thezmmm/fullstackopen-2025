import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null
}

const authConfig = () => ({ headers: { Authorization: token } })

const getAll = async () => {
  const response = await axios.get(baseUrl, authConfig())
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, authConfig())
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, authConfig())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, authConfig())
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

export default { getAll, setToken, create, update, remove, addComment }
