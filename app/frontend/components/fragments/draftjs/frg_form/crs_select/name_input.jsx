import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {FlashContext, InvldContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {validCheck} from 'components/layouts/axios/validate'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const NameInput = ({selectVal, genSelectSeq, editorFocus}) => {
  const {setFlashMsg} = useContext(FlashContext)
  const {setInvldMsg} = useContext(InvldContext)
  const [crsName, setCrsName] = useState('')
  const [inputShow, tglInputShow] = useState(false)

  /* selectVal 検知 */
  useEffect(() => {
    if (selectVal === '0') tglInputShow(true)
    else tglInputShow(false)
  }, [selectVal])

  /* crystal 新規作成 */
  const postCrystal = () => {
    const check = validCheck({crsName})
    if (check[0]) {
      setInvldMsg(check[1]) // validation エラーメッセージ
    } else {
      axiosRails
        .post('/crystals', {
          crystal: {name: crsName}
        })
        .then((response) => {
          setFlashMsg(transFlash(response.headers.flash))
          tglInputShow(false) // NameInput 非表示
          setCrsName('') // name input 初期化
          genSelectSeq(response.data, response.data[0].id)
        })
        .catch((error) => {
          setFlashMsg(transFlash(error.response.headers.flash))
        })
    }
  }

  /* crystal name ボタン押下 追加 */
  const onCreateClick = () => {
    postCrystal()
    editorFocus()
  }

  /* crystal name 変更 */
  const onNameChange = (e) => {
    setCrsName(e.target.value)
  }

  /* name input 生成 */
  const nameInput = (showBool) => {
    if (!showBool) return null
    return (
      <>
        <input type='text' required autoFocus value={crsName} onChange={onNameChange} />
        <button type='button' onClick={onCreateClick}>
          作成
        </button>
      </>
    )
  }

  return nameInput(inputShow)
}

NameInput.propTypes = {
  selectVal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  genSelectSeq: PropTypes.func,
  editorFocus: PropTypes.func
}
