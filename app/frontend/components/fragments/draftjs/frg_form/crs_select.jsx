import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setFlashStr, setCclStr} from 'components/layouts/axios/then_catch_funcs'

export const CrsSelect = ({onGenChange, bufCrsIdBlur}) => {
  const [crsSelect, setCrsSelect] = useState(null)

  /* crsId 更新  */
  const onCrsIdBlur = (e) => {
    e.preventDefault()
    // newCrs プロセス作成すべし
    if (e.target.value === 'new') console.log('newCrs')
    else bufCrsIdBlur(parseInt(e.target.value, 10))
  }

  /* didMount willUnMount */
  useEffect(() => {
    axiosRails
      .get('/fragments/new')
      .then((response) => {
        bufCrsIdBlur(response.data[0].id)
        setCrsSelect(
          <div>
            <label htmlFor='crsSelect'>
              作成先クリスタル
              <select id='crsSelect' required defaultValue={response.data[0].id} onBlur={onCrsIdBlur}>
                {response.data.map((crystal) => (
                  <option key={crystal.id} value={crystal.id}>
                    {crystal.name}
                  </option>
                ))}
                <option value='new'>新規作成</option>
              </select>
            </label>
          </div>
        )
      })
      .catch((error) => {
        onGenChange(Object.assign(setCclStr(error), setFlashStr(error.response.header.flash)))
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
