import React from 'react'
import PropTypes from 'prop-types'

export const AtomicButton = (props) => {
  const {mediaType, onAddMediaUrlInput} = props

  // メディアURL 更新
  const onMouseDown = (e) => {
    e.preventDefault()
    onAddMediaUrlInput(mediaType)
  }

  return (
    <button type='button' onMouseDown={onMouseDown}>
      {mediaType}
    </button>
  )
}

AtomicButton.propTypes = {
  mediaType: PropTypes.string.isRequired,
  onAddMediaUrlInput: PropTypes.func
}
