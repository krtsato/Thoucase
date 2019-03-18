import React, {useContext, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {editorContext} from 'components/fragments/contexts/editor_context'

export const UrlInput = (props) => {
  let urlInput = null
  const {showUrlInput, urlVal, onAddMediaUrl, onMediaChange} = props
  const editorBlur = useContext(editorContext)

  /* フォーカス */
  const urlInputRef = useRef(null)
  const urlInputFocus = () => {
    console.log('url / focus')
    urlInputRef.current.focus()
  }
  const urlInputBlur = () => {
    console.log('url / blur')
    urlInputRef.current.blur()
  }

  /* ライフサイクル */
  useEffect(() => {
    if (showUrlInput) {
      editorBlur
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