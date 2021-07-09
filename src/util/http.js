import axios from 'axios'
import { Toast } from 'vant'

const http = axios.create({
  timeout: 20000
  // headers: { 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1604496075983972712546306","bc":"310100"}' }
})
// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  Toast.loading({
    message: '加载中',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  Toast.clear()
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  Toast.clear()
  return Promise.reject(error)
})
export default http
