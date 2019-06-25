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

  /* Toolbox ~ UrlInput : メディア 追加 */
  const addMediaToEditor = () => {
    const {urlType, urlVal} = urlParams
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', {urlVal})
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity})

    // UrlInput 初期化・非表示
    setUrlParams({showUrlInput: false, urlType: '', urlVal: ''})
    // editorState 更新
    onEditorChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
  }

  // 再定義を避けるため Map 生成
  const styleTypeArr = [
    ['b', 'BOLD'],
    ['i', 'ITALIC'],
    ['p', 'paragraph'],
    ['s', 'inSection'],
    ['h1', 'header-one'],
    ['h2', 'header-two'],
    ['h3', 'header-three'],
    ['ol', 'ordered-list-item'],
    ['ul', 'unordered-list-item'],
    ['quote', 'blockquote'],
    ['code', 'code-block'],
    ['image', 'image'],
    ['audio', 'audio'],
    ['video', 'video']
  ]
  const styleTypeMap = new Map(styleTypeArr)
  const btnName = styleTypeMap.keys()

  return (
    <div className='frgTool'>
      <InlineStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('b')} {...props} />
      <InlineStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('i')} {...props} />
      <BlockStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('p')} {...props} />
      <BlockStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('s')} {...props} />
      <BlockStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('h1')} {...props} />
      <BlockStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('h2')} {...props} />
      <BlockStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('h3')} {...props} />
      <BlockStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('ol')} {...props} />
      <BlockStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('ul')} {...props} />
      <BlockStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('quote')} {...props} />
      <BlockStyleBtn btnName={btnName.next().value} styleType={styleTypeMap.get('code')} {...props} />
      <AtomicBtn
        btnName={btnName.next().value}
        mediaType={styleTypeMap.get('image')}
        setUrlParams={setUrlParams}
      />
      <AtomicBtn
        btnName={btnName.next().value}
        mediaType={styleTypeMap.get('audio')}
        setUrlParams={setUrlParams}
      />
      <AtomicBtn
        btnName={btnName.next().value}
        mediaType={styleTypeMap.get('video')}
        setUrlParams={setUrlParams}
      />
      <UrlInput
        showUrlInput={urlParams.showUrlInput}
        urlVal={urlParams.urlVal}
        setUrlParams={setUrlParams}
        addMediaToEditor={addMediaToEditor}
      />
    </div>
  )
}

Toolbox.propTypes = {
  editorState: PropTypes.object,
  onEditorChange: PropTypes.func
}
