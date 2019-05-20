import React from 'react'
import PropTypes from 'prop-types'

export const Namebox = ({bufNameChange, editorFocus}) => {
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

  return <input type='text' required autoFocus onChange={onNameChange} onKeyDown={onKeyDown} />
}

Namebox.propTypes = {
  bufNameChange: PropTypes.func,
  editorFocus: PropTypes.func
}
