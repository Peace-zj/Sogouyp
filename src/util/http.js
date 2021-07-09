import axios from 'axios'
import { Toast } from 'vant'

const http = axios.create({
  timeout: 20000
})
http.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
  Toast.clear()
  return response
}, function (error) {
  Toast.clear()
  return Promise.reject(error)
})
export default http
