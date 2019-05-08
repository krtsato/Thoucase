import React, {useState, useEffect, useRef} from 'react'
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, convertToRaw} from 'draft-js'
import Immutable from 'immutable'
// import {axiosRails} from 'components/layouts/axios/instances'
import {Media} from 'components/fragments/draftjs/frg_editor/media'
import {Toolbox} from 'components/fragments/draftjs/frg_editor/toolbox'
import {Namebox} from 'components/fragments/draftjs/frg_editor/namebox'

export const FrgEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  /* フォーカス */
  const editorRef = useRef(null)
  const editorFocus = () => {
    editorRef.current.focus()
  }

  /* editorState Did Update */
  useEffect(() => {
    editorFocus
  }, [editorState])

  /* editorState Update 処理 */
  const onEditorChange = (nextState) => {
    setEditorState(nextState)
  }

  /* Media コンポーネント呼び出し */
  const blockRendererFn = (contentBlock) => {
    const entityType = contentBlock.getType()
    let block = null
    switch (entityType) {
      case 'atomic':
        block = {
          component: Media,
          editable: false
        }
        break
      default:
        break
    }
    return block
  }

  /* Style クラス名付加 */
  const blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType()
    let className
    switch (type) {
      case 'paragraph':
        className = 'paragraph'
        break
      case 'inSection':
        className = 'inSection'
        break
      case 'header-one':
        className = 'header1'
        break
      case 'header-two':
        className = 'header2'
        break
      case 'header-three':
        className = 'header3'
        break
      case 'blockquote':
        className = 'blockQuote'
        break
      case 'code-block':
        className = 'preCode'
        break
      case 'atomic':
        className = 'atomicFigure'
        break
      case 'ordered-list-item':
        className = 'orderedList'
        break
      case 'unordered-list-item':
        className = 'unOrderedList'
        break
      default:
        className = null
        break
    }
    return className
  }

  /* Style タグ付加 */
  const newMap = Immutable.Map({
    inSection: {
      element: 'section'
    }
  })
  const blockRenderMap = DefaultDraftBlockRenderMap.merge(newMap)

  /* Style キーコマンド */
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onEditorChange(newState)
      return true
    }
    return false
  }

  /* JSONB型で保存 */
  const save = () => {
    const rawState = convertToRaw(editorState.getCurrentContent())
    console.log(JSON.stringify(rawState, undefined, 2))
    /*
    axiosRails.post(`crystals/${crystal_id}/fragments/create`, {
      name: frg_name,
      content: rawState
    })
    */
  }

  return (
    <>
      {/* エラーメッセージ */}
      <Namebox editorFocus={editorFocus} />
      <Toolbox editorState={editorState} onEditorChange={onEditorChange} />
      <Editor
        editorState={editorState}
        ref={editorRef}
        onChange={onEditorChange}
        blockRendererFn={blockRendererFn}
        blockStyleFn={blockStyleFn}
        blockRenderMap={blockRenderMap}
        handleKeyCommand={handleKeyCommand}
      />
      {/* 保存ボタン */}
      <button type='button' onClick={save}>
        保存
      </button>
    </>
  )
}
