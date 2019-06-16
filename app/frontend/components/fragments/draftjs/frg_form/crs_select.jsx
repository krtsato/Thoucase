import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'
import {NameInput} from 'components/fragments/draftjs/frg_form/crs_select/name_input'

export const CrsSelect = ({bufSelectBlur, editorFocus}) => {
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [crsOpts, setCrsOpts] = useState(null)
  const [selectVal, setSelectVal] = useState('')

  const onSelectBlur = () => {
    // select による型変換を相殺
    bufSelectBlur(parseInt(selectVal, 10))
  }

  /* focus Enter 切替 */
  const onEnterDown = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      editorFocus() // -> onCrsIdBlur
    }
  }

  /* select value コントロール */
  const onSelectChange = (e) => {
    e.preventDefault()
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
  const genSelectSeq = (res, id) => {
    bufSelectBlur(id) // FrgForm ~ CrsSelect : crsId 初期値を設定
    setSelectVal(id) // select value 初期値
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
          <option value='new'>新規作成</option>
        </select>
      </label>
      <NameInput selectVal={selectVal} genSelectSeq={genSelectSeq} editorFocus={editorFocus} />
    </div>
  )
}

CrsSelect.propTypes = {
  bufSelectBlur: PropTypes.func,
  editorFocus: PropTypes.func
}
