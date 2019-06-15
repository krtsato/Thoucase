import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'
import {NameInput} from 'components/fragments/draftjs/frg_form/crs_select/name_input'

export const CrsSelect = ({bufCrsIdBlur}) => {
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [crsSelect, setCrsSelect] = useState(null)
  const [showNameInput, setShowNameInput] = useState(false)

  /* crsId 更新  */
  const onCrsIdBlur = (e) => {
    e.preventDefault()
    bufCrsIdBlur(parseInt(e.target.value, 10))
  }

  /* CrsSelect ~ NameInput : NameInput 表示 */
  const onCrsIdChange = (e) => {
    e.preventDefault()
    if (e.target.value === 'new') setShowNameInput(true)
  }

  /* didMount willUnMount */
  useEffect(() => {
    axiosRails
      .get('/fragments/new')
      .then((response) => {
        bufCrsIdBlur(response.data[0].id)
        setCrsSelect(
          <select
            id='crsSelect'
            required
            defaultValue={response.data[0].id}
            onChange={onCrsIdChange}
            onBlur={onCrsIdBlur}>
            {response.data.map((crystal) => (
              <option key={crystal.id} value={crystal.id}>
                {crystal.name}
              </option>
            ))}
            <option value='new'>新規作成</option>
          </select>
        )
      })
      .catch((error) => {
        setCclMsg(cancelLine(error))
        setFlashMsg(transFlash(error.response.header.flash))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  return (
    <div className='crsSelect'>
      <label htmlFor='crsSelect'>
        作成先クリスタル
        {crsSelect}
      </label>
      <NameInput
        showNameInput={showNameInput}
        setCrsSelect={setCrsSelect}
        onCrsIdChange={onCrsIdChange}
        onCrsIdBlur={onCrsIdBlur}
      />
    </div>
  )
}

CrsSelect.propTypes = {
  bufCrsIdBlur: PropTypes.func
}
