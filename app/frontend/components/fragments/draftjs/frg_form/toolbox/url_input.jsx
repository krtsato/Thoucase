import React from 'react'
import PropTypes from 'prop-types'

export const UrlInput = ({showUrlInput, urlVal, bufUrlChange, bufAddMedia}) => {
  /* URL 更新 */
  const onUrlChange = (e) => {
    bufUrlChange(e.target.value)
  }

  /* メディア Enter 追加 */
  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      bufAddMedia()
    }
  }

  /* メディア ボタン押下 追加 */
  const onAddClick = () => {
    bufAddMedia()
  }

  /* URL input 生成 */
  const urlInput = (showBool) => {
    if (!showBool) return null
    return (
      <>
        <input type='url' required autoFocus value={urlVal} onChange={onUrlChange} onKeyDown={onEnterDown} />
        <button type='button' onClick={onAddClick}>
          追加
        </button>
      </>
    )
  }

  return urlInput(showUrlInput)
}

UrlInput.propTypes = {
  showUrlInput: PropTypes.bool,
  urlVal: PropTypes.string,
  bufUrlChange: PropTypes.func,
  bufAddMedia: PropTypes.func
}
