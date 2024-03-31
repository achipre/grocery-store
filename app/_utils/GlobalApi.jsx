const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: 'http://192.168.100.6:1337/api'
})

export const getCategory = () => axiosClient.get('/categories?populate=*')
export const getSliders = () => axiosClient.get('/sliders?populate=*').then(resp => {
  return resp?.data?.data
})
export const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp => {
  return resp?.data?.data
})
export const getAllProducts = () => axiosClient.get('/products?populate=*').then(resp => {
  return resp?.data?.data
})

export const getProductsByCategory = (category) => axiosClient.get(`/products?filters[categories][name][$eq]=${category}&populate=*`).then(resp => {
  return resp?.data?.data
})

export const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {username, email, password})
export const signIn = (email, password) => axiosClient.post('/auth/local', {
  identifier:email, 
  password
})