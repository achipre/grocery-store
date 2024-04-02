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

export const addToBuyCart = (data, jwt) => axiosClient.post('/user-carts', data, {
  headers:{
    Authorization: 'Bearer ' + jwt
  }
})

export const getCartItemsApi = (userId, jwt) => axiosClient.get(`/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url`,{
  headers:{
    Authorization: 'Bearer ' + jwt
  }
})
  .then(resp => {
    const data = resp.data.data
    const cartInfo = data.map((item,idx) => ({
      name: item?.attributes?.products?.data[0]?.attributes?.name,
      quantity: item?.attributes?.quantity,
      amount: item?.attributes?.amount,
      image: item?.attributes?.products?.data[0]?.attributes?.images?.data[0]?.attributes?.url,
      actualPrice: item?.attributes?.products?.data[0]?.sellingPrice,
      id:item?.id
    }))
    return cartInfo
  })

  export const deleteCartItem = (id, jwt) => axiosClient.delete(`/user-carts/${id}`, {
    headers: {
      Authorization: 'Bearer ' + jwt
    }
  })