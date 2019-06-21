import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Editor, EditorState, convertFromRaw} from 'draft-js'
import {CancelContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine} from 'components/layouts/axios/then_catch_funcs'
import {HeadInfo} from 'components/fragments/draftjs/frg_view/head_info'
import {Actionbox} from 'components/fragments/draftjs/frg_view/actionbox'
import {Media} from 'components/fragments/draftjs/frg_form/media'

export const FrgView = ({initState}) => {
  const {setCclMsg} = useContext(CancelContext)
  const [frgVals, setFrgVals] = useState(initState)
  const [addNames, setAddNames] = useState({usrName: '', crsName: ''})
  const [isSelf, setIsSelf] = useState(false)

  /*
    from Link, Redirect : fragment 既存
    from URL            : fragment 取得
    common              : usrName, crsName, isSelf 取得 
  */
  const resDivider = (resData) => {
    if (resData.fragment) {
      // FrgView : editorState 復元, frgVals 更新
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
      setFrgVals({frgId, frgName, editorState, usrId, crsId, creAt, updAt})
    }
    const usrName = resData.usr_name
    const crsName = resData.crs_name
    setAddNames({usrName, crsName})
    setIsSelf(resData.is_self) // FrgView ~ Footbox : isSelf 更新
  }

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get(`/fragments/${frgVals.frgId}`, {
        params: {user_id: frgVals.usrId, crystal_id: frgVals.crsId}
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
      <h1 className='frgName'>{frgVals.frgName}</h1>
      <HeadInfo
        usrName={addNames.usrName}
        crsName={addNames.crsName}
        creAt={frgVals.creAt}
        updAt={frgVals.updAt}
      />
      <Editor readOnly={true} editorState={frgVals.editorState} blockRendererFn={blockRendererFn} />
      <Actionbox isSelf={isSelf} frgVals={frgVals} />
    </>
  )
}

FrgView.propTypes = {
  initState: PropTypes.object
}
