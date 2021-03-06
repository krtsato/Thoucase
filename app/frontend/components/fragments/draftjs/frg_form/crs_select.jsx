import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'
import {NameInput} from 'components/fragments/draftjs/frg_form/crs_select/name_input'

export const CrsSelect = ({crsId, setFragment, editorFocus}) => {
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [crsOpts, setCrsOpts] = useState(null)
  const [selectVal, setSelectVal] = useState('0')

  const onSelectBlur = () => {
    const intVal = parseInt(selectVal, 10) // select による型変換を相殺
    setFragment((unChanged) => ({...unChanged, crsId: intVal}))
  }

  /* focus Enter 切替 */
  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      editorFocus() // -> onSelectBlur
    }
  }

  /* select value コントロール */
  const onSelectChange = (e) => {
    setSelectVal(e.target.value)
  }

  /* CrsSelect ~ NameInput : option 生成 */
  const optionList = (crystals) => (
    <>
      {crystals.map((crystal) => (
        <option key={crystal.id} value={crystal.id}>
          {crystal.name}
        </option>
      ))}
    </>
  )

  /* CrsSelect ~ NameInput : axios then 共通処理 */
  const genSelectSeq = (resData, val) => {
    if (!val) val = 0 // マウント時の null に対して, NameInputを表示させる
    setFragment((unChanged) => ({...unChanged, crsId: val})) // FrgForm ~ CrsSelect : crsId 初期値を設定
    setSelectVal(val.toString(10)) // select value 初期値で InputShow = true にするため文字列変換
    setCrsOpts(optionList(resData)) // select 生成・更新
  }

  /* didMount willUnMount */
  useEffect(() => {
    axiosRails
      .get('/fragments/new')
      .then((response) => {
        genSelectSeq(response.data, crsId)
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
    <div className='crsSelect'>
      <label htmlFor='crsSelect'>
        作成先クリスタル
        <select
          id='crsSelect'
          required
          value={selectVal}
          onChange={onSelectChange}
          onKeyDown={onEnterDown}
          onBlur={onSelectBlur}>
          {crsOpts}
          <option value='0'>新規作成</option>
        </select>
      </label>
      <NameInput selectVal={selectVal} genSelectSeq={genSelectSeq} editorFocus={editorFocus} />
    </div>
  )
}

CrsSelect.propTypes = {
  crsId: PropTypes.number,
  setFragment: PropTypes.func,
  editorFocus: PropTypes.func
}
