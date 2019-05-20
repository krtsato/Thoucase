import React from 'react'
import PropTypes from 'prop-types'
import {RichUtils} from 'draft-js'

export const BlockStyleBtn = ({styleType, editorState, onEditorChange}) => {
  /* block style 適用 */
  const onStyleClick = (e) => {
    e.preventDefault()
    onEditorChange(RichUtils.toggleBlockType(editorState, styleType))
  }

  return (
    <button type='button' onClick={onStyleClick}>
      {styleType}
    </button>
  )
}

BlockStyleBtn.propTypes = {
  styleType: PropTypes.string,
  editorState: PropTypes.object,
  onEditorChange: PropTypes.func
}
