import axios from 'axios'

window.serverHost = 'http://127.0.0.1:8000'
axios.defaults.timeout = 10000
axios.defaults.baseURL = window.serverHost

export const getAccountInfo = params => { return axios.post(`/v1/chain/get_account`, params).then(res => res.data)}
export const register = params => { return axios.post(`/v1/h5/api/register/do`, params).then(res => res.data)}