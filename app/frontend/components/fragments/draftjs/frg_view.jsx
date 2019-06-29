import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Editor, EditorState, convertFromRaw} from 'draft-js'
import {CancelContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine} from 'components/layouts/axios/then_catch_funcs'
import {HeadInfo} from 'components/fragments/draftjs/frg_view/head_info'
import {ActionBtns} from 'components/fragments/draftjs/frg_view/action_btns'
import {Media} from 'components/fragments/draftjs/frg_form/media'

export const FrgView = ({initState}) => {
  const {setCclMsg} = useContext(CancelContext)
  const [fragment, setFragment] = useState(initState)
  const [addNames, setAddNames] = useState({usrName: '', crsName: ''})
  const [isSelf, setIsSelf] = useState(false)

  /*
    from Link, Redirect except delete action    : fragment 既存
    from URL query or Redirect by delete action : fragment 取得
    common : usrName, crsName, isSelf 取得
  */
  const resDivider = (resData) => {
    if (resData.fragment) {
      // FrgView : editorState 復元, fragment 更新
      const {
        id: frgId,
        name: frgName,
        content: rawContent,
        user_id: usrId,
        crystal_id: crsId,
        created_at: creAt,
        updated_at: updAt
      } = resData.fragment
      const contentState = convertFromRaw(rawContent)
      const editorState = EditorState.createWithContent(contentState)
      setFragment({frgId, frgName, editorState, usrId, crsId, creAt, updAt})
    }
    const usrName = resData.usr_name
    const crsName = resData.crs_name
    setAddNames({usrName, crsName}) // FrgView ~ HeadInfo : addNames 更新
    setIsSelf(resData.is_self) // FrgView ~ ActionBtns : isSelf 更新
  }

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get(`/fragments/${fragment.frgId}`, {
        params: {user_id: fragment.usrId, crystal_id: fragment.crsId}
      })
      .then((response) => {
        resDivider(response.data)
      })
      .catch((error) => {
        setCclMsg(cancelLine(error))
      })
    return () => {
      canceller.cancel
    }
  }, [])

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

  return (
    <>
      <h1 className='frgName'>{fragment.frgName}</h1>
      <HeadInfo
        usrName={addNames.usrName}
        crsName={addNames.crsName}
        creAt={fragment.creAt}
        updAt={fragment.updAt}
      />
      <Editor readOnly={true} editorState={fragment.editorState} blockRendererFn={blockRendererFn} />
      <ActionBtns isSelf={isSelf} fragment={fragment} />
    </>
  )
}

FrgView.propTypes = {
  initState: PropTypes.object
}
