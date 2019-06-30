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
  const [fragment, setFragment] = useState(initState)

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
    setFragment((unChanged) => ({...unChanged, editorState: nextState}))
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
    const classTypeArr = [
      // ['Name in Draft.js', 'className']
      ['paragraph', 'paragraph'],
      ['inSection', 'inSection'],
      ['header-one', 'header1'],
      ['header-two', 'header2'],
      ['header-three', 'header3'],
      ['blockquote', 'blockQuote'],
      ['code-block', 'preCode'],
      ['atomic', 'atomicFigure'],
      ['ordered-list-item', 'orderedList'],
      ['unordered-list-item', 'unOrderedList']
    ]
    const classTypeDic = new Map(classTypeArr)
    const type = contentBlock.getType()
    return classTypeDic.get(type)
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
    const newState = RichUtils.handleKeyCommand(fragment.editorState, command)
    if (!newState) return false
    onEditorChange(newState)
    return true
  }

  /* form */
  return (
    <>
      <NameInput frgName={fragment.frgName} setFragment={setFragment} editorFocus={editorFocus} />
      <CrsSelect crsId={fragment.crsId} setFragment={setFragment} editorFocus={editorFocus} />
      <Toolbox editorState={fragment.editorState} onEditorChange={onEditorChange} />
      <Editor
        editorState={fragment.editorState}
        onChange={onEditorChange}
        blockRendererFn={blockRendererFn}
        blockStyleFn={blockStyleFn}
        blockRenderMap={blockRenderMap}
        handleKeyCommand={handleKeyCommand}
        ref={editorRef}
      />
      <SaveBtn reqMethod={reqMethod} fragment={fragment} />
    </>
  )
}

FrgForm.propTypes = {
  reqMethod: PropTypes.string,
  initState: PropTypes.object
}
