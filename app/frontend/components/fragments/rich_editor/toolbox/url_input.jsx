import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

export const UrlInput = (props) => {
  let urlInput = null
  const {showUrlInput, urlVal, onAddMediaUrl, onMediaChange} = props

  /* フォーカス */
  const urlInputRef = useRef(null)
  const urlInputFocus = () => urlInputRef.current.focus()
  const urlInputBlur = () => urlInputRef.current.blur()

  /* ライフサイクル */
  useEffect(() => {
    if (showUrlInput) {
      urlInputFocus()
    }
    return () => urlInputBlur
  }, [showUrlInput])

  /* メディアURL 更新 */
  const onUrlChange = (e) => {
    e.preventDefault()
    onAddMediaUrl(e.target.value)
  }

  /* メディア キー入力更新 */
  const onKeyDown = (e) => {
    if (e.which === 13) {
      onMediaChange(e)
    }
  }

  /* メディア キー入力更新 */
  const onMouseDown = (e) => {
    e.preventDefault()
    onMediaChange()
  }

  /* メディアURLインプット 生成 */
  if (showUrlInput) {
    urlInput = (
      <div>
        <input
          type='text'
          value={urlVal}
          ref={urlInputRef}
          onChange={onUrlChange}
          onKeyDown={onKeyDown}
        />
        <button type='button' onMouseDown={onMouseDown}>Add Media</button>
      </div>
    )
  }

  /* レンダリング */
  return urlInput
}

UrlInput.propTypes = {
  showUrlInput: PropTypes.bool,
  urlVal: PropTypes.string,
  onAddMediaUrl: PropTypes.func,
  onMediaChange: PropTypes.func,
  editorBlur: PropTypes.func
}