import React from 'react'
import PropTypes from 'prop-types'

export const AtomicBtn = ({btnName, mediaType, setUrlParams}) => {
  /* URL input 生成 */
  const onAtomicClick = () => {
    setUrlParams((unChanged) => ({...unChanged, showUrlInput: true, urlType: mediaType}))
  }

  return (
    <button type='button' onClick={onAtomicClick}>
      {btnName}
    </button>
  )
}

AtomicBtn.propTypes = {
  btnName: PropTypes.string,
  mediaType: PropTypes.string,
  setUrlParams: PropTypes.func
}
