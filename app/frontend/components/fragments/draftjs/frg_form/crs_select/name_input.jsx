import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import {FlashContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const NameInput = ({showNameInput, setCrsSelect, onCrsIdChange, onCrsIdBlur}) => {
  let nameInput = null // return
  const {setFlashMsg} = useContext(FlashContext)
  const [crsName, setCrsName] = useState('')

  /* crystal name 変更 */
  const onNameChange = (e) => {
    e.preventDefault()
    setCrsName(e.target.value)
  }

  /* crystal 新規作成 */
  const postCrystal = () => {
    axiosRails
      .post('/crystals', {
        crystal: {name: crsName}
      })
      .then((response) => {
        setFlashMsg(transFlash(response.headers.flash))
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
        ) // CrsSelect ~ NameInput : select option 更新
      })
      .catch((error) => {
        setFlashMsg(transFlash(error.response.headers.flash))
      })
  }

  /* crystal name Enter 追加 */
  const onEnterDown = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      postCrystal()
    }
  }

  /* crystal name ボタン押下 追加 */
  const onCreateClick = (e) => {
    e.preventDefault()
    postCrystal()
  }

  /* name input 生成 */
  if (showNameInput) {
    nameInput = (
      <>
        <input
          type='text'
          required
          autoFocus
          value={crsName}
          onChange={onNameChange}
          onKeyDown={onEnterDown}
        />
        <button type='button' onClick={onCreateClick}>
          作成
        </button>
      </>
    )
  }

  return nameInput
}

NameInput.propTypes = {
  showNameInput: PropTypes.bool,
  setCrsSelect: PropTypes.func,
  onCrsIdChange: PropTypes.func,
  onCrsIdBlur: PropTypes.func
}
