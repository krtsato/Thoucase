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
  const divStr = rawFlash.split('-')
  if (divStr[0] === 'ok') {
    switch (divStr[1]) {
      case 'snin':
        return {flashStr: 'サインインしました'}
      case 'snout':
        return {flashStr: 'サインアウトしました'}
      case 'crfrg':
        return {flashStr: 'フラグメントを作成しました'}
      default:
        return null
    }
  } else if (divStr[0] === 'er') {
    switch (divStr[1]) {
      case 'auth':
        return {flashStr: '権限がありません'}
      case 'snin':
        return {flashStr: 'メールアドレスまたはパスワードが間違っています'}
      case 'crfrg':
        return {flashStr: 'フラグメントの作成に失敗しました'}
      default:
        return null
    }
  } else {
    return null
  }
}

/* catch キャンセルメッセージ・エラーメッセージ 返却 */
const setCclStr = (error) => {
  const cclMsg = axios.isCancel(error) ? 'リクエストがキャンセルされました' : null
  return {cclStr: cclMsg}
}

export {setToken, removeToken, setFlashStr, setCclStr}
