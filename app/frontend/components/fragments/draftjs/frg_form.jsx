import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {Editor, RichUtils, DefaultDraftBlockRenderMap} from 'draft-js'
import {Map as ImmMap} from 'immutable'
import {Namebox} from 'components/fragments/draftjs/frg_form/namebox'
import {CrsSelect} from 'components/fragments/draftjs/frg_form/crs_select'
import {Media} from 'components/fragments/draftjs/frg_form/media'
import {Toolbox} from 'components/fragments/draftjs/frg_form/toolbox'
import {Footbox} from 'components/fragments/draftjs/frg_form/footbox'

export const FrgForm = ({reqMethod, initState, onGenChange}) => {
  const {frgId} = initState
  const [frgName, setFrgName] = useState(initState.frgName)
  const [crsId, setCrsId] = useState(initState.crsId)
  const [editorState, setEditorState] = useState(initState.editorState)

  /* Editor ~ Namebox : focus */
  const editorRef = useRef(null)
  const editorFocus = () => {
    editorRef.current.focus()
  }

  /* Editor ~ Namebox : frgName 更新 */
  const bufNameChange = (nextState) => {
    setFrgName(nextState)
  }

  /* Editor ~ CrsSelect : crsId 更新 */
  const bufCrsIdBlur = (nextState) => {
    setCrsId(nextState)
  }

  /*
    Editor : editorState 更新 
    Editor ~ Toolbox : メディア 追加
  */
  const onEditorChange = (nextState) => {
    setEditorState(nextState)
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
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onEditorChange(newState)
      return true
    }
    return false
  }

  /* form */
  return (
    <>
      <Namebox frgName={frgName} bufNameChange={bufNameChange} editorFocus={editorFocus} />
      <CrsSelect onGenChange={onGenChange} bufCrsIdBlur={bufCrsIdBlur} />
      <Toolbox editorState={editorState} onEditorChange={onEditorChange} />
      <Editor
        editorState={editorState}
        onChange={onEditorChange}
        blockRendererFn={blockRendererFn}
        blockStyleFn={blockStyleFn}
        blockRenderMap={blockRenderMap}
        handleKeyCommand={handleKeyCommand}
        ref={editorRef}
      />
      <Footbox
        onGenChange={onGenChange}
        reqMethod={reqMethod}
        frgId={frgId}
        frgName={frgName}
        crsId={crsId}
        editorState={editorState}
      />
    </>
  )
}

FrgForm.propTypes = {
  reqMethod: PropTypes.string,
  initState: PropTypes.object,
  onGenChange: PropTypes.func
}
