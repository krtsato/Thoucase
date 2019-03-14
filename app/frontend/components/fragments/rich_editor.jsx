/**
 * To Do
 * ・保存機能
 *   ・エラーメッセージ
 *   ・タイトル入力欄
 *   ・保存ボタン
 */
import React, {useState, useEffect, useRef} from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertToRaw
} from 'draft-js'
import Immutable from 'immutable'
import {Media} from 'components/fragments/rich_editor/media'
import {Toolbox} from 'components/fragments/rich_editor/toolbox'

export const RichEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  /* フォーカス */
  const editorRef = useRef(null)
  this.editorFocus = () => {
    editorRef.current.focus()
  }

  /* ライフサイクル*/
  useEffect(() => {
    this.editorFocus
  }, [editorState])

  /* エディタステイト 更新 */
  this.onEditorChange = (editorState) => {
    setEditorState(editorState)
  }

  /* メディア 呼出 */
  this.blockRendererFn = (contentBlock) => {
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

  /* スタイル クラス名付加 */
  this.blockStyleFn = (contentBlock) => {
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

  /* スタイル タグ付加 */
  const newMap = Immutable.Map({
    inSection: {
      element: 'section'
    }
  })
  const blockRenderMap = DefaultDraftBlockRenderMap.merge(newMap)

  /* スタイル キーコマンド */
  this.handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onEditorChange(newState)
      return true
    }
    return false
  }

  /* 保存 */
  this.save = () => {
    // JSONB 型で rawState を保存する
    const rawState = convertToRaw(editorState.getCurrentContent())
    console.log(JSON.stringify(rawState, undefined, 1))
  }

  /* レンダリング */
  return (
    <div>
      <h1>Draft.js example</h1>
      {/* エラーメッセージ */}
      {/* タイトル入力欄 */}
      <Toolbox editorState={editorState} onEditorChange={this.onEditorChange} />
      <Editor
        editorState={editorState}
        ref={editorRef}
        onChange={this.onEditorChange}
        blockRendererFn={this.blockRendererFn}
        blockStyleFn={this.blockStyleFn}
        blockRenderMap={blockRenderMap}
        handleKeyCommand={this.handleKeyCommand}
      />
      {/* 保存ボタン */}
      <button type='button' onClick={this.save}>
        LOG
      </button>
    </div>
  )
}