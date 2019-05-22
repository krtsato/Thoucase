import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, convertToRaw} from 'draft-js'
import {Map as ImmMap} from 'immutable'
import {axiosRails} from 'components/layouts/axios/instances'
import {checkPost} from 'components/layouts/axios/validate'
import {setFlashStr} from 'components/layouts/axios/then_catch_funcs'
import {Namebox} from 'components/fragments/draftjs/frg_form/namebox'
import {CrsSelect} from 'components/fragments/draftjs/frg_form/crs_select'
import {Media} from 'components/fragments/draftjs/frg_form/media'
import {Toolbox} from 'components/fragments/draftjs/frg_form/toolbox'

export const FrgForm = ({onGenChange}) => {
  const [redrPath, setRedrPath] = useState(null)
  const [frgName, setFrgName] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  let crsId = null // from CrsSelect

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
  const bufCrsIdBlur = (targetVal) => {
    crsId = targetVal
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

  /* Editor : form 保存 */
  const onSaveClick = () => {
    const rawFrg = convertToRaw(editorState.getCurrentContent())
    const checker = checkPost({frgName, rawFrg})

    if (checker.isInvld) {
      onGenChange(checker.invldArr) // validation エラーメッセージ
    } else {
      axiosRails
        .post(`/crystals/${crsId}/fragments`, {
          name: frgName,
          content: rawFrg,
          crsId
        })
        .then((response) => {
          console.log(response.data)
          // onGenChange(setFlashStr(response.header.flash))
          // setRedrPath(<Redirect to={`/fragments/${response.data.id}`} />) // リダイレクト
        })
        .catch((error) => {
          onGenChange(setFlashStr(error.response.header.flash))
        })
    }
  }

  /* form */
  return (
    <>
      {redrPath}
      <Namebox bufNameChange={bufNameChange} editorFocus={editorFocus} />
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
      <button type='button' onClick={onSaveClick}>
        save
      </button>
    </>
  )
}

FrgForm.propTypes = {
  onGenChange: PropTypes.func
}
