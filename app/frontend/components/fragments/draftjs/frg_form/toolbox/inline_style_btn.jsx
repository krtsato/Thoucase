import React from 'react'
import PropTypes from 'prop-types'
import {RichUtils} from 'draft-js'

export const InlineStyleBtn = ({btnName, styleType, editorState, onEditorChange}) => {
  /* inline style 適用 */
  const onStyleClick = () => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, styleType))
  }

  return (
    <button type='button' onClick={onStyleClick}>
      {btnName}
    </button>
  )
}

InlineStyleBtn.propTypes = {
  btnName: PropTypes.string,
  styleType: PropTypes.string,
  editorState: PropTypes.object,
  onEditorChange: PropTypes.func
}
