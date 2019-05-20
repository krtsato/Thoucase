import React from 'react'
import PropTypes from 'prop-types'

export const AtomicBtn = ({mediaType, bufAtomicClick}) => {
  /* URL input 生成 */
  const onAtomicClick = (e) => {
    e.preventDefault()
    bufAtomicClick(mediaType)
  }

  return (
    <button type='button' onClick={onAtomicClick}>
      {mediaType}
    </button>
  )
}

AtomicBtn.propTypes = {
  mediaType: PropTypes.string,
  bufAtomicClick: PropTypes.func
}
