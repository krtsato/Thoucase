import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, convertToRaw} from 'draft-js'
import {Map as ImmMap} from 'immutable'
import {axiosRails} from 'components/layouts/axios/instances'
import {setFlashStr, setErrObj} from 'components/layouts/axios/then_catch_funcs'
import {Media} from 'components/fragments/draftjs/frg_editor/media'
import {Toolbox} from 'components/fragments/draftjs/frg_editor/toolbox'
import {Namebox} from 'components/fragments/draftjs/frg_editor/namebox'

export const FrgEditor = ({onGenChange}) => {
  const [redrPath, setRedrPath] = useState(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  /* focus */
  const editorRef = useRef(null)
  const editorFocus = () => {
    editorRef.current.focus()
  }

  /* editorState didUpdate */
  useEffect(() => {
    editorFocus
  }, [editorState])

  /* editorState Update */
  const onEditorChange = (nextState) => {
    setEditorState(nextState)
  }

  /* Media component 呼出し */
  const blockRendererFn = (contentBlock) => {
    const entityType = contentBlock.getType()
    switch (entityType) {
      case 'atomic':
        return {component: Media, editable: false}
      default:
        return null
    }
  }

  /* Style className 付加 */
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

  /* Style HTMLタグ 付加 */
  const newMap = ImmMap({
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
  const onClick = () => {
    const rawState = convertToRaw(editorState.getCurrentContent())
    console.log(JSON.stringify(rawState, undefined, 2))

    /* これをら用意する */
    const crsId = 1
    const frgName = 'hoge'
    const frgId = 2

    axiosRails
      .post(`crystals/${crsId}/fragments`, {
        name: frgName,
        content: rawState
      })
      .then((response) => {
        onGenChange(setFlashStr(response.header.flash))
        setRedrPath(<Redirect to={`/fragments/${frgId}`} />) // リダイレクト
      })
      .catch((error) => {
        onGenChange(setErrObj(error))
      })
  }

  return (
    <>
      {redrPath}
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
      <button type='button' onClick={onClick}>
        save
      </button>
    </>
  )
}

FrgEditor.propTypes = {
  onGenChange: PropTypes.func
}
