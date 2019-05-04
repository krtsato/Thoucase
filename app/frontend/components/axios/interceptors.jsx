export const setReqAuth = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      // トークン付加
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export const setResAuth = (instance) => {
  instance.interceptors.response.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
