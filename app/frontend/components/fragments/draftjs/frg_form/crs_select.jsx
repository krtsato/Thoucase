import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'
import {NameInput} from 'components/fragments/draftjs/frg_form/crs_select/name_input'

export const CrsSelect = ({setFragment, editorFocus}) => {
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [crsOpts, setCrsOpts] = useState(null)
  const [selectVal, setSelectVal] = useState('')

  const onSelectBlur = () => {
    const crsId = parseInt(selectVal, 10) // select による型変換を相殺
    setFragment((unChanged) => ({...unChanged, crsId}))
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
  const genSelectSeq = (res, crsId) => {
    setFragment((unChanged) => ({...unChanged, crsId})) // FrgForm ~ CrsSelect : crsId 初期値を設定
    setSelectVal(crsId) // select value 初期値
    setCrsOpts(optionList(res)) // select 生成・更新
  }

  /* didMount willUnMount */
  useEffect(() => {
    axiosRails
      .get('/fragments/new')
      .then((response) => {
        const resData = response.data
        genSelectSeq(resData, resData[0].id)
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
  setFragment: PropTypes.func,
  editorFocus: PropTypes.func
}
