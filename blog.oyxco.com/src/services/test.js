import axios from './config'

export const fetchTest = (params) => {
  return axios.get('/test/api', { params })
}

export const sendTest = (params) => {
  return axios.post('/test/api', { ...params })
}