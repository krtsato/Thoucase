import React from 'react'
import PropTypes from 'prop-types'
import {RichUtils} from 'draft-js'

export const BlockStyleBtn = ({btnName, styleType, editorState, onEditorChange}) => {
  /* block style 適用 */
  const onStyleClick = () => {
    onEditorChange(RichUtils.toggleBlockType(editorState, styleType))
  }

  return (
    <button type='button' onClick={onStyleClick}>
      {btnName}
    </button>
  )
}

BlockStyleBtn.propTypes = {
  btnName: PropTypes.string,
  styleType: PropTypes.string,
  editorState: PropTypes.object,
  onEditorChange: PropTypes.func
}
