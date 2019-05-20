import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {EditorState, AtomicBlockUtils} from 'draft-js'
import {InlineStyleBtn} from 'components/fragments/draftjs/frg_form/toolbox/inline_style_btn'
import {BlockStyleBtn} from 'components/fragments/draftjs/frg_form/toolbox/block_style_btn'
import {AtomicBtn} from 'components/fragments/draftjs/frg_form/toolbox/atomic_btn'
import {UrlInput} from 'components/fragments/draftjs/frg_form/toolbox/url_input'

export const Toolbox = (props) => {
  const {editorState, onEditorChange} = props
  const [urlParams, setUrlParams] = useState({
    showUrlInput: false,
    urlType: '',
    urlVal: ''
  })

  /* Toolbox ~ AtomicBtn : URL input 生成 */
  const bufAtomicClick = (mediaType) => {
    setUrlParams({showUrlInput: true, urlType: mediaType, urlVal: ''})
  }

  /* Toolbox ~ UrlInput : メディア URL 更新 */
  const bufUrlChange = (mediaUrl) => {
    setUrlParams((nextState) => ({
      ...nextState,
      urlVal: mediaUrl
    }))
  }

  /* Toolbox ~ UrlInput : メディア 追加 */
  const bufAddMedia = () => {
    const {urlType, urlVal} = urlParams
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', {urlVal})
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    // UrlInput 初期化・非表示
    setUrlParams((nextState) => ({
      ...nextState,
      showUrlInput: false,
      urlVal: ''
    }))

    // editorState 更新
    onEditorChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
  }

  return (
    <>
      <InlineStyleBtn styleType='BOLD' {...props} />
      <InlineStyleBtn styleType='ITALIC' {...props} />
      <BlockStyleBtn styleType='paragraph' {...props} />
      <BlockStyleBtn styleType='inSection' {...props} />
      <BlockStyleBtn styleType='header-one' {...props} />
      <BlockStyleBtn styleType='header-two' {...props} />
      <BlockStyleBtn styleType='header-three' {...props} />
      <BlockStyleBtn styleType='ordered-list-item' {...props} />
      <BlockStyleBtn styleType='unordered-list-item' {...props} />
      <BlockStyleBtn styleType='blockquote' {...props} />
      <BlockStyleBtn styleType='code-block' {...props} />
      <AtomicBtn mediaType='image' bufAtomicClick={bufAtomicClick} />
      <AtomicBtn mediaType='audio' bufAtomicClick={bufAtomicClick} />
      <AtomicBtn mediaType='video' bufAtomiclick={bufAtomicClick} />
      <UrlInput
        showUrlInput={urlParams.showUrlInput}
        urlVal={urlParams.urlVal}
        bufUrlChange={bufUrlChange}
        bufAddMedia={bufAddMedia}
      />
    </>
  )
}

Toolbox.propTypes = {
  editorState: PropTypes.object,
  onEditorChange: PropTypes.func
}
