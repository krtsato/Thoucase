import axios from 'axios'
import qs from 'qs'

export const axiosCrud = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {'content-type': 'application/json'},
  paramsSerializer: (params) => {
    return qs.stringify(params, {arrayFormat: 'brackets'})
  },
  timeout: 3000,
  xsrfHeaderName: 'X-CSRF-Token'
})
