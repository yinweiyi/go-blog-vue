import axios from 'axios'
import { parseResult } from './functions'

const baseUrl = 'http://localhost:3000'

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

instance.interceptors.response.use(response => {
  const { data } = response
  return parseResult(data)
}, error => {
  console.log(error)
  return {
    code: error.code,
    message: '服务器内部错误',
    data: null
  }
})

export default instance
