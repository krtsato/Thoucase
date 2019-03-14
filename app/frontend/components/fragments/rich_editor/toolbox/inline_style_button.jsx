import React from 'react'
import PropTypes from 'prop-types'
import {RichUtils} from 'draft-js'

export const InlineStyleButton = (props) => {
  const {styleType, editorState, onEditorChange} = props

  // スタイル 反映
  this.onMouseDown = (e) => {
    e.preventDefault()
    onEditorChange(RichUtils.toggleInlineStyle(editorState, styleType))
  }

  // 描画
  return (
    <button type='button' onMouseDown={this.onMouseDown}>
      {styleType}
    </button>
  )
}

InlineStyleButton.propTypes = {
  styleType: PropTypes.string.isRequired,
  editorState: PropTypes.object,
  onEditorChange: PropTypes.func
}