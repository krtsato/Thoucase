import React from 'react'
import PropTypes from 'prop-types'

export const Namebox = ({crsName, bufNameChange}) => {
  const onNameChange = (e) => {
    bufNameChange(e.target.value)
  }
  return (
    <div className='crsName'>
      <label htmlFor='crsName'>
        フラグメント名
        <input id='crsName' type='text' required autoFocus value={crsName} onChange={onNameChange} />
      </label>
    </div>
  )
}

Namebox.propTypes = {
  crsName: PropTypes.string,
  bufNameChange: PropTypes.func
}
