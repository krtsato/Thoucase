import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {FlashContext, InvldContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {validCheck} from 'components/layouts/axios/validate'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const NameInput = ({selectVal, setCrystal, genSelectSeq}) => {
  const {setFlashMsg} = useContext(FlashContext)
  const {setInvldMsg} = useContext(InvldContext)
  const [shwName, setShwName] = useState('')
  const [inputShow, tglInputShow] = useState(false)

  /* selectVal 検知 */
  useEffect(() => {
    if (selectVal === '0') tglInputShow(true)
    else tglInputShow(false)
  }, [selectVal])

  /* showcase 新規作成 */
  const postShowcase = () => {
    const check = validCheck({shwName})
    if (check[0]) {
      setInvldMsg(check[1]) // validation エラーメッセージ
    } else {
      axiosRails
        .post('/showcases', {
          showcase: {name: shwName}
        })
        .then((response) => {
          const resData = response.data
          setFlashMsg(transFlash(response.headers.flash))
          tglInputShow(false) // NameInput 非表示
          setShwName('') // name input 初期化
          genSelectSeq(resData, resData[0].id)
          setCrystal((unChanged) => ({...unChanged, shwId: resData[0].id})) // CrsForm ~ ShwSelect : shwId 初期値を設定
        })
        .catch((error) => {
          setFlashMsg(transFlash(error.response.headers.flash))
        })
    }
  }

  /* showcase name ボタン押下 追加 */
  const onCreateClick = () => {
    postShowcase()
    // 説明欄を作ってフォーカス
  }

  /* showcase name 変更 */
  const onNameChange = (e) => {
    setShwName(e.target.value)
  }

  /* name input 生成 */
  const nameInput = (showBool) => {
    if (!showBool) return null
    return (
      <>
        <input type='text' required autoFocus value={shwName} onChange={onNameChange} />
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
  setCrystal: PropTypes.func,
  genSelectSeq: PropTypes.func
}
