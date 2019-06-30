import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'
import {NameInput} from 'components/crystals/edit/crs_form/shw_select/name_input'

export const ShwSelect = ({shwId, setCrystal}) => {
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [shwOpts, setShwOpts] = useState(null)
  const [selectVal, setSelectVal] = useState('')

  const onSelectBlur = () => {
    // -1 : 展示しない場合, shwId の null は許容される
    // 0~ : select による型変換を相殺
    // 0  : 新規作成の途中で保存したとき, バリデーションエラー
    const intVal = parseInt(selectVal, 10)
    const id = intVal === -1 ? null : intVal
    setCrystal((unChanged) => ({...unChanged, shwId: id}))
  }

  /* focus Enter 切替 */
  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // 説明欄を作ってフォーカス -> onSelectBlur
    }
  }

  /* select value コントロール */
  const onSelectChange = (e) => {
    setSelectVal(e.target.value)
  }

  /* ShwSelect ~ NameInput : option 生成 */
  const optionList = (showcases) => (
    <>
      {showcases.map((showcase) => (
        <option key={showcase.id} value={showcase.id}>
          {showcase.name}
        </option>
      ))}
    </>
  )

  /* ShwSelect ~ NameInput : axios then 共通処理 */
  const genSelectSeq = (resData, val) => {
    if (!val) val = -1
    setSelectVal(val) // select value 初期値
    setShwOpts(optionList(resData)) // select 生成・更新
  }

  /* didMount willUnMount */
  useEffect(() => {
    axiosRails
      .get('/crystals/edit')
      .then((response) => {
        genSelectSeq(response.data, shwId)
      })
      .catch((error) => {
        setCclMsg(cancelLine(error))
        setFlashMsg(transFlash(error.response.headers.flash))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  return (
    <div className='shwSelect'>
      <label htmlFor='shwSelect'>
        展示先ショーケース
        <select
          id='shwSelect'
          required
          value={selectVal}
          onChange={onSelectChange}
          onKeyDown={onEnterDown}
          onBlur={onSelectBlur}>
          <option value='-1'>展示しない</option>
          {shwOpts}
          <option value='0'>新規作成</option>
        </select>
      </label>
      <NameInput selectVal={selectVal} setCrystal={setCrystal} genSelectSeq={genSelectSeq} />
      {/* NameInputの入力ができたら説明欄にフォーカス */}
    </div>
  )
}

ShwSelect.propTypes = {
  shwId: PropTypes.number,
  setCrystal: PropTypes.func
}
