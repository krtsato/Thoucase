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
      case 'udfrg':
        return {flashStr: 'フラグメントを更新しました'}
      case 'dlfrg':
        return {flashStr: 'フラグメントを削除しました'}
      case 'crcrs':
        return {flashStr: 'クリスタルを作成しました'}
      case 'udcrs':
        return {flashStr: 'クリスタルを更新しました'}
      case 'dlcrs':
        return {flashStr: 'クリスタルを削除しました'}
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
      case 'upfrg':
        return {flashStr: 'フラグメントの更新に失敗しました'}
      case 'dlfrg':
        return {flashStr: 'フラグメントの削除に失敗しました'}
      case 'crcrs':
        return {flashStr: 'クリスタルの作成に失敗しました'}
      case 'udcrs':
        return {flashStr: 'クリスタルの更新に失敗しました'}
      case 'dlcrs':
        return {flashStr: 'クリスタルの削除に失敗しました'}
      default:
        return null
    }
  } else {
    return null
  }
}

const setSninBool = (rawFlash) => {
  if (rawFlash.split('-')[1] === 'snin') return {sninBool: true}
  return {sninBool: false}
}

/* catch キャンセルメッセージ 返却 */
const setCclStr = (error) => {
  const cclMsg = axios.isCancel(error) ? 'リクエストがキャンセルされました' : null
  return {cclStr: cclMsg}
}

export {setToken, removeToken, setFlashStr, setSninBool, setCclStr}
