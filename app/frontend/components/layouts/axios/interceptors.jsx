/* Request トークン 付加 */
const setToken = (config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.authorization = `Bearer ${token}`
}

/* Response トークン 保存 */
const saveServerInfo = (config) => {
  const token = config.headers.authorization
  if (token) {
    localStorage.setItem('token', token)
  }
}

/* Response フラッシュメッセージ 分類 */
const setFlash = (config) => {
  const rawFlash = config.headers.flash
  if (!rawFlash) return -1

  let jaFlash = null
  const divStr = rawFlash.split('-')
  if (divStr[0] === 'ok') {
    switch (divStr[1]) {
      case 'signin':
        jaFlash = 'サインインしました'
        saveServerInfo(config)
        break
      default:
        break
    }
  } else if (divStr[0] === 'er') {
    switch (divStr[1]) {
      case 'auth':
        jaFlash = '権限がありません'
        break
      case 'signin':
        jaFlash = 'メールアドレスまたはパスワードが間違っています'
        break
      default:
        break
    }
  }
  return jaFlash
}

export const setReqCeptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      setToken(config)
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export const setResCeptor = (instance) => {
  instance.interceptors.response.use(
    (config) => {
      setFlash(config)
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
