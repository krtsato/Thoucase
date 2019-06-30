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
  const flashArr = [
    // 認証・認可
    ['er-auth', '権限がありません'],
    ['er-forbd', 'サインイン中のため無効です'],
    ['er-sign', 'サインインするかアカウントを作成して下さい'],
    ['ok-snin', 'サインインしました'],
    ['er-snin', 'メールアドレスまたはパスワードが間違っています'],
    ['ok-snout', 'サインアウトしました'],
    // User CRUD
    ['ok-crusr', 'アカウントを作成しました'],
    ['er-crusr', 'アカウントの作成に失敗しました'],
    ['ok-udusr', 'アカウント情報を更新しました'],
    ['er-udusr', 'アカウント情報の更新に失敗しました'],
    ['ok-dlusr', 'アカウントを削除しました'],
    ['er-dlusr', 'アカウントの削除に失敗しました'],
    // Showcase CRUD
    ['ok-crshw', 'ショーケースを作成しました'],
    ['er-crshw', 'ショーケースの作成に失敗しました'],
    ['ok-udshw', 'ショーケースを更新しました'],
    ['er-udshw', 'ショーケースの更新に失敗しました'],
    ['ok-dlshw', 'ショーケースを削除しました'],
    ['er-dlshw', 'ショーケースの削除に失敗しました'],
    // Crystal CRUD
    ['ok-crcrs', 'クリスタルを作成しました'],
    ['er-crcrs', 'クリスタルの作成に失敗しました'],
    ['ok-udcrs', 'クリスタルを更新しました'],
    ['er-udcrs', 'クリスタルの更新に失敗しました'],
    ['ok-dlcrs', 'クリスタルを削除しました'],
    ['er-dlcrs', 'クリスタルの削除に失敗しました'],
    // Fragment CRUD
    ['ok-crfrg', 'フラグメントを作成しました'],
    ['er-crfrg', 'フラグメントの作成に失敗しました'],
    ['ok-udfrg', 'フラグメントを更新しました'],
    ['er-udfrg', 'フラグメントの更新に失敗しました'],
    ['ok-dlfrg', 'フラグメントを削除しました'],
    ['er-dlfrg', 'フラグメントの削除に失敗しました']
  ]
  const flashDic = new Map(flashArr)
  return flashDic.get(rawFlash)
}

/* catch キャンセルメッセージ 返却 */
const cancelLine = (error) => (axios.isCancel(error) ? 'リクエストがキャンセルされました' : null)

export {setToken, removeToken, transFlash, cancelLine}
