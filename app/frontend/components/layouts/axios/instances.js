import axios from 'axios'
import qs from 'qs'
import {setReqCeptor, setResCeptor} from 'components/layouts/axios/interceptors'

const canceller = axios.CancelToken.source()

const axiosRails = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {'content-type': 'application/json'},
  paramsSerializer: (params) => {
    return qs.stringify(params, {arrayFormat: 'brackets'})
  },
  timeout: 3000,
  xsrfHeaderName: 'X-CSRF-Token',
  cancelToken: canceller.token
})

setReqCeptor(axiosRails)
setResCeptor(axiosRails)
export {axiosRails, canceller}
