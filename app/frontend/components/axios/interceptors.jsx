export const setReqAuth = (instance) => {
  instance.interceptors.request.use(
    (config) => {
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
