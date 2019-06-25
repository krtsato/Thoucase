import React from 'react'
import PropTypes from 'prop-types'

export const NameInput = ({crsName, setCrsVals}) => {
  const onNameChange = (e) => {
    const name = e.target.value
    setCrsVals((unChanged) => ({...unChanged, crsName: name}))
  }

  return (
    <div className='crsName'>
      <label htmlFor='crsName'>
        クリスタル名
        <input id='crsName' type='text' required autoFocus value={crsName} onChange={onNameChange} />
      </label>
    </div>
  )
}

NameInput.propTypes = {
  crsName: PropTypes.string,
  setCrsVals: PropTypes.func
}
