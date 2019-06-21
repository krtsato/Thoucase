import React from 'react'
import PropTypes from 'prop-types'

export const NameInput = ({frgName, bufNameChange, editorFocus}) => {
  /* frgName 更新 */
  const onNameChange = (e) => {
    e.preventDefault()
    bufNameChange(e.target.value)
  }

  /* focus Enter 切替 */
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      editorFocus()
    }
  }

  return (
    <div className='frgName'>
      <label htmlFor='frgName'>
        フラグメント名
        <input
          id='frgName'
          type='text'
          required
          autoFocus
          value={frgName}
          onChange={onNameChange}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  )
}

NameInput.propTypes = {
  frgName: PropTypes.string,
  bufNameChange: PropTypes.func,
  editorFocus: PropTypes.func
}
