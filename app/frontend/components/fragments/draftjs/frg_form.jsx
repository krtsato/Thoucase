import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {Editor, RichUtils, DefaultDraftBlockRenderMap} from 'draft-js'
import {Map as ImmMap} from 'immutable'
import {NameInput} from 'components/fragments/draftjs/frg_form/name_input'
import {CrsSelect} from 'components/fragments/draftjs/frg_form/crs_select'
import {Media} from 'components/fragments/draftjs/frg_form/media'
import {Toolbox} from 'components/fragments/draftjs/frg_form/toolbox'
import {SaveBtn} from 'components/fragments/draftjs/frg_form/save_btn'

export const FrgForm = ({reqMethod, initState}) => {
  const [frgVals, setFrgVals] = useState(initState)

  /* Editor ~ NameInput : focus */
  const editorRef = useRef(null)
  const editorFocus = () => {
    editorRef.current.focus()
  }

  /*
    Editor : editorState 更新 
    Editor ~ Toolbox : メディア 追加
  */
  const onEditorChange = (nextState) => {
    setFrgVals((unChanged) => ({...unChanged, editorState: nextState}))
  }

  /* 
    Editor : block 要素を描画
    Editor ~ Media : Media 呼出し
  */
  const blockRendererFn = (contentBlock) => {
    const type = contentBlock.getType()
    switch (type) {
      case 'atomic':
        return {component: Media, editable: false}
      default:
        return null
    }
  }

  /*
    Editor : className 付加
    Editor ~ Toolbox ~ BlockStyleBtn : block style 適用
  */
  const blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType()
    switch (type) {
      case 'paragraph':
        return 'paragraph'
      case 'inSection':
        return 'inSection'
      case 'header-one':
        return 'header1'
      case 'header-two':
        return 'header2'
      case 'header-three':
        return 'header3'
      case 'blockquote':
        return 'blockQuote'
      case 'code-block':
        return 'preCode'
      case 'atomic':
        return 'atomicFigure'
      case 'ordered-list-item':
        return 'orderedList'
      case 'unordered-list-item':
        return 'unOrderedList'
      default:
        return null
    }
  }

  /*
    Editor : HTMLタグ 付加
    Editor ~ Toolbox ~ BlockStyleBtn : block style 適用
  */
  const newMap = ImmMap({
    inSection: {
      element: 'section'
    }
  })
  const blockRenderMap = DefaultDraftBlockRenderMap.merge(newMap)

  /*
    Editor : inline style キーコマンド 適用
    Editor ~ Toolbox ~ inlineStyleBtn : inline style 適用
  */
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(frgVals.editorState, command)
    if (!newState) return false
    onEditorChange(newState)
    return true
  }

  /* form */
  return (
    <>
      <NameInput frgName={frgVals.frgName} setFrgVals={setFrgVals} editorFocus={editorFocus} />
      <CrsSelect setFrgVals={setFrgVals} editorFocus={editorFocus} />
      <Toolbox editorState={frgVals.editorState} onEditorChange={onEditorChange} />
      <Editor
        editorState={frgVals.editorState}
        onChange={onEditorChange}
        blockRendererFn={blockRendererFn}
        blockStyleFn={blockStyleFn}
        blockRenderMap={blockRenderMap}
        handleKeyCommand={handleKeyCommand}
        ref={editorRef}
      />
      <SaveBtn reqMethod={reqMethod} frgVals={frgVals} />
    </>
  )
}

FrgForm.propTypes = {
  reqMethod: PropTypes.string,
  initState: PropTypes.object
}
