/*
  form : 共通簡易的バリデーション
  invalid : 空文字・null を違反とする
  返却値 : {isInvld: bool, invldArr: array}
*/
const validCheck = (chkObj) => {
  const chkPairs = Object.entries(chkObj) // [[k, v], [k, v] ...]

  // rawFrg : text が一文字でもあれば true
  const hasText = (val) => {
    return val.blocks.some((block) => block.text)
  }

  // invalid な [k, v] が一つでもあれば true
  const isInvld = chkPairs.some((pair) => {
    switch (pair[0]) {
      case 'frgName':
        return !pair[1]
      case 'rawFrg':
        return !hasText(pair[1])
      default:
        return true
    }
  })

  // invalid な [[k, v], [k, v] ...] を抽出
  const invldArr = chkPairs
    .filter((pair) => {
      switch (pair[0]) {
        case 'frgName':
          return !pair[1]
        case 'rawFrg':
          return !hasText(pair[1])
        default:
          return -1
      }
    })
    // invalid な [k, v] を {k, m} に写像
    .map((pair) => {
      switch (pair[0]) {
        case 'frgName':
          return {key: pair[0], msg: 'フラグメントの名前を入力して下さい'}
        case 'rawFrg':
          return {key: pair[0], msg: 'フラグメントの内容を入力して下さい'}
        default:
          return -1
      }
    })

  return [isInvld, {invldArr}]
}

export {validCheck}
