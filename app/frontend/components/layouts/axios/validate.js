/*
  form : 共通簡易的バリデーション
  invalid : 空文字・null を違反とする
  返却値 : {isInvld: bool, invldArr: array}
*/
const validCheck = (chkObj) => {
  const chkPairs = Object.entries(chkObj) // [[k, v], [k, v] ...]

  // validation エラーメッセージ
  const invldArr = [
    ['email', {key: 'email', msg: 'Eメールを入力して下さい'}],
    ['passwd', {key: 'passwd', msg: 'パスワードを入力して下さい'}],
    ['frgName', {key: 'frgName', msg: 'フラグメントの名前を入力して下さい'}],
    ['rawFrg', {key: 'rawFrg', msg: 'フラグメントの内容を入力して下さい'}],
    ['crsId', {key: 'crsId', msg: 'クリスタルを選択して下さい'}],
    ['crsName', {key: 'crsName', msg: 'クリスタルの名前を入力して下さい'}],
    ['shwId', {key: 'shwId', msg: 'ショーケースを選択して下さい'}],
    ['shwName', {key: 'shwName', msg: 'ショーケースの名前を入力して下さい'}]
  ]
  const invldDic = new Map(invldArr)

  // rawFrg : text が一文字でもあれば true
  const hasText = (val) => {
    return val.blocks.some((block) => block.text)
  }

  // invalid な [k, v] が一つでもあれば true
  const isInvld = chkPairs.some((pair) => {
    switch (pair[0]) {
      case 'email':
        return !pair[1]
      case 'passwd':
        return !pair[1]
      case 'frgName':
        return !pair[1]
      case 'rawFrg':
        return !hasText(pair[1])
      case 'crsId':
        return !pair[1]
      case 'crsName':
        return !pair[1]
      case 'shwId':
        return pair[1] !== null && !pair[1] === true
      case 'shwName':
        return !pair[1]
      default:
        return true
    }
  })

  // invalid な [[k, v], [k, v] ...] を抽出
  const invldPair = chkPairs
    .filter((pair) => {
      switch (pair[0]) {
        case 'email':
          return !pair[1]
        case 'passwd':
          return !pair[1]
        case 'frgName':
          return !pair[1]
        case 'rawFrg':
          return !hasText(pair[1])
        case 'crsId':
          return !pair[1]
        case 'crsName':
          return !pair[1]
        case 'shwId':
          return pair[1] !== null && !pair[1] === true
        case 'shwName':
          return !pair[1]
        default:
          return -1
      }
    })
    // invalid な [k, v] を {k, m} に写像
    .map((pair) => invldDic.get(pair[0]))

  return [isInvld, invldPair]
}

export {validCheck}
