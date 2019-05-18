import axios from 'axios'

/* then トークン localStorage 保存 */
const setToken = (tokenKey, tokenVal) => {
  localStorage.setItem(tokenKey, tokenVal)
}

/* then トークン localStorage 削除 */
const removeToken = (tokenKey) => {
  localStorage.removeItem(tokenKey)
}

/* then フラッシュメッセージ 分類・返却 */
const setFlashStr = (rawFlash) => {
  let jaFlash = null // return
  const divStr = rawFlash.split('-')
  if (divStr[0] === 'ok') {
    switch (divStr[1]) {
      case 'snin':
        jaFlash = 'サインインしました'
        break
      case 'snout':
        jaFlash = 'サインアウトしました'
        break
      default:
        break
    }
  } else if (divStr[0] === 'er') {
    switch (divStr[1]) {
      case 'auth':
        jaFlash = '権限がありません'
        break
      case 'snin':
        jaFlash = 'メールアドレスまたはパスワードが間違っています'
        break
      default:
        break
    }
  }
  return {flashStr: jaFlash}
}

/* catch キャンセルメッセージ・エラーメッセージ 返却 */
const setErrObj = (error) => {
  const cclMsg = axios.isCancel(error) ? 'リクエストがキャンセルされました' : null
  const errMsg = error.message
  return {errObj: {cclMsg, errMsg}}
}

export {setToken, removeToken, setFlashStr, setErrObj}
