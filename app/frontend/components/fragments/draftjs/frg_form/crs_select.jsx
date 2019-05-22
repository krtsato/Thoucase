import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setFlashStr, setCclStr} from 'components/layouts/axios/then_catch_funcs'

export const CrsSelect = ({onGenChange, bufCrsIdBlur}) => {
  const [crsSelect, setCrsSelect] = useState(null)

  /* crsId 更新  */
  const onCrsIdBlur = (e) => {
    e.preventDefault()
    bufCrsIdBlur(e.target.value)
  }

  /* didMount */
  useEffect(() => {
    axiosRails
      .get('/fragments/new')
      .then((response) => {
        // 表示確認すべし
        setCrsSelect(
          <select required defaultValue={response.data[0].id} onBlur={onCrsIdBlur}>
            {response.data.map((crystal) => (
              <option key={crystal.id} value={crystal.id}>
                {crystal.name}
              </option>
            ))}
          </select>
        )
      })
      .catch((error) => {
        onGenChange(setCclStr(error))
        onGenChange(setFlashStr(error.response.header.flash))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  return crsSelect
}

CrsSelect.propTypes = {
  onGenChange: PropTypes.func,
  bufCrsIdBlur: PropTypes.func
}
