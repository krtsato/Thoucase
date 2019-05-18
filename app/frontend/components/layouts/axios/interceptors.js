/* Request トークン 付加 */
const setReqToken = (headers) => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) headers.authorization = `Bearer ${authToken}`
}

const setReqCeptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      setReqToken(config.headers)
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

const setResCeptor = (instance) => {
  instance.interceptors.response.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export {setReqCeptor, setResCeptor}
