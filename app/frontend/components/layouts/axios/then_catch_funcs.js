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
const transFlash = (rawFlash) => {
  const divStr = rawFlash.split('-')
  if (divStr[0] === 'ok') {
    switch (divStr[1]) {
      case 'snin':
        return 'サインインしました'
      case 'snout':
        return 'サインアウトしました'
      case 'crfrg':
        return 'フラグメントを作成しました'
      case 'udfrg':
        return 'フラグメントを更新しました'
      case 'dlfrg':
        return 'フラグメントを削除しました'
      case 'crcrs':
        return 'クリスタルを作成しました'
      case 'udcrs':
        return 'クリスタルを更新しました'
      case 'dlcrs':
        return 'クリスタルを削除しました'
      default:
        return null
    }
  } else if (divStr[0] === 'er') {
    switch (divStr[1]) {
      case 'sign':
        return 'サインインするかアカウントを作成して下さい'
      case 'auth':
        return '権限がありません'
      case 'snin':
        return 'メールアドレスまたはパスワードが間違っています'
      case 'crfrg':
        return 'フラグメントの作成に失敗しました'
      case 'upfrg':
        return 'フラグメントの更新に失敗しました'
      case 'dlfrg':
        return 'フラグメントの削除に失敗しました'
      case 'crcrs':
        return 'クリスタルの作成に失敗しました'
      case 'udcrs':
        return 'クリスタルの更新に失敗しました'
      case 'dlcrs':
        return 'クリスタルの削除に失敗しました'
      default:
        return null
    }
  } else {
    return null
  }
}

/* catch キャンセルメッセージ 返却 */
const cancelLine = (error) => (axios.isCancel(error) ? 'リクエストがキャンセルされました' : null)

export {setToken, removeToken, transFlash, cancelLine}
