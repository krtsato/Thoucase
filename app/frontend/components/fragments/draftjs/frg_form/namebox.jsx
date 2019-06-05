import React from 'react'
import PropTypes from 'prop-types'

export const Namebox = ({frgName, bufNameChange, editorFocus}) => {
  /* frgName 更新 */
  const onNameChange = (e) => {
    e.preventDefault()
    bufNameChange(e.target.value)
  }

  /* focus Enter 切替 */
  const onKeyDown = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      editorFocus()
    }
  }

  return (
    <div>
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

Namebox.propTypes = {
  frgName: PropTypes.string,
  bufNameChange: PropTypes.func,
  editorFocus: PropTypes.func
}
