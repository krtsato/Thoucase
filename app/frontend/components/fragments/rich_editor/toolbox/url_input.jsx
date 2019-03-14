import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

export const UrlInput = (props) => {
  let urlInput = null
  const {showUrlInput, urlVal, onAddMediaUrl, onMediaChange} = props

  /* フォーカス */
  const urlInputRef = useRef(null)
  this.urlInputFocus = () => urlInputRef.current.focus()
  this.urlInputBlur = () => urlInputRef.current.blur()

  /* ライフサイクル */
  useEffect(() => {
    if (showUrlInput) {
      this.urlInputFocus
    }
    return () => this.urlInputBlur
  }, [showUrlInput])

  /* メディアURL 更新*/
  this.onUrlChange = (e) => {
    e.preventDefault()
    onAddMediaUrl(e.target.value)
  }

  /* メディア キー入力更新 */
  this.onKeyDown = (e) => {
    if (e.which === 13) {
      onMediaChange(e)
    }
  }

  /* メディア キー入力更新 */
  this.onMouseDown = (e) => {
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
          onChange={this.onUrlChange}
          onKeyDown={this.onKeyDown}
        />
        <button onMouseDown={this.onMouseDown}>Add Media</button>
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
  onMediaChange: PropTypes.func
}