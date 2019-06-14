import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setFlashStr, setCclStr} from 'components/layouts/axios/then_catch_funcs'
import {NameInput} from 'components/fragments/draftjs/frg_form/crs_select/name_input'

export const CrsSelect = ({onGenChange, bufCrsIdBlur}) => {
  const [crsSelect, setCrsSelect] = useState(null)
  const [showNameInput, setShowNameInput] = useState(false)

  /* crsId 更新  */
  const onCrsIdBlur = (e) => {
    e.preventDefault()
    // newCrs プロセス作成すべし
    if (e.target.value === 'new') console.log('newCrs')
    else bufCrsIdBlur(parseInt(e.target.value, 10))
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
        onGenChange(Object.assign(setCclStr(error), setFlashStr(error.response.header.flash)))
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
  onGenChange: PropTypes.func,
  bufCrsIdBlur: PropTypes.func
}
