import React from 'react'
import PropTypes from 'prop-types'

export const NameInput = ({shwName, setShowcase}) => {
  const onNameChange = (e) => {
    const name = e.target.value
    setShowcase((unChanged) => ({...unChanged, shwName: name}))
  }

  return (
    <div className='shwName'>
      <label htmlFor='shwName'>
        ショーケース名
        <input id='shwName' type='text' required autoFocus value={shwName} onChange={onNameChange} />
      </label>
    </div>
  )
}

NameInput.propTypes = {
  shwName: PropTypes.string,
  setShowcase: PropTypes.func
}
