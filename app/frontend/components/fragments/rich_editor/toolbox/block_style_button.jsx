import React from 'react'
import PropTypes from 'prop-types'
import {RichUtils} from 'draft-js'

export const BlockStyleButton = (props) => {
  const {styleType, editorState, onEditorChange} = props

  // スタイル 反映
  const onMouseDown = (e) => {
    e.preventDefault()
    onEditorChange(RichUtils.toggleBlockType(editorState, styleType))
  }

  // 描画
  return (
    <button type='button' onMouseDown={onMouseDown}>
      {styleType}
    </button>
  )
}

BlockStyleButton.propTypes = {
  styleType: PropTypes.string.isRequired,
  editorState: PropTypes.object,
  onEditorChange: PropTypes.func
}