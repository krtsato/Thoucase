import React from 'react'
import PropTypes from 'prop-types'

export const UrlInput = ({showUrlInput, urlVal, setUrlParams, addMediaToEditor}) => {
  /* URL 更新 */
  const onUrlChange = (e) => {
    const url = e.target.value
    setUrlParams((unChanged) => ({...unChanged, urlVal: url}))
  }

  /* メディア Enter 追加 */
  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addMediaToEditor()
    }
  }

  /* メディア ボタン押下 追加 */
  const onAddClick = () => {
    addMediaToEditor()
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
  setUrlParams: PropTypes.func,
  addMediaToEditor: PropTypes.func
}
