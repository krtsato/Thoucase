/*
  form : 共通簡易的バリデーション
  空文字・null を invalid とする
*/

/* invalid な val が一つでもあれば false */
const isInvalid = (chkObj) => {
  const arrVals = Object.values(chkObj)
  return arrVals.some((val) => !val)
}

/* invalid な POST データに対して, 文字列配列を出力 */
const setInvldArr = (chkObj) => {
  const invldMsg = Object.entries(chkObj) // [[k, v], [k, v] ...]
    .filter((pair) => !pair[1]) // invalid な [k, v] を抽出
    .map((pair) => {
      // invalid な [k, v] を {key, msg} に写像
      const key = pair[0]
      switch (key) {
        case 'frgName':
          return {key, msg: 'フラグメントの名前を入力して下さい'}
        case 'rawFrg':
          return {key, msg: 'フラグメントの内容を入力して下さい'}
        default:
          return null
      }
    })
  // [{key, msg}, {key, msg} ...]
  return {invldArr: invldMsg}
}

export {isInvalid, setInvldArr}
