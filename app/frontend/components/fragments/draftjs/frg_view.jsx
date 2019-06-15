import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Editor, EditorState, convertFromRaw} from 'draft-js'
import {CancelContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine} from 'components/layouts/axios/then_catch_funcs'
import {Namebox} from 'components/fragments/draftjs/frg_view/namebox'
import {Headbox} from 'components/fragments/draftjs/frg_view/headbox'
import {Footbox} from 'components/fragments/draftjs/frg_view/footbox'
import {Media} from 'components/fragments/draftjs/frg_form/media'

export const FrgView = ({initState}) => {
  const {setCclMsg} = useContext(CancelContext)
  const [frgVals, setFrgVals] = useState(initState)
  const [isSelf, setIsSelf] = useState(false)

  /*
    from Link, Redirect : isSelf で fragment 所有者か判定
    from URL            : fragment 取得
  */
  const resDivider = (resData) => {
    if (frgVals.usrId) {
      // FrgView ~ Footbox : isSelf 更新
      setIsSelf(resData)
    } else {
      // FrgView : editorState 復元, frgVals 更新
      const {
        id: frgId,
        name: frgName,
        content: rawContent,
        user_id: usrId,
        crystal_id: crsId,
        created_at: creAt,
        updated_at: updAt
      } = resData
      const contentState = convertFromRaw(rawContent)
      const editorState = EditorState.createWithContent(contentState)
      setFrgVals({frgId, frgName, editorState, usrId, crsId, creAt, updAt})
    }
  }

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get(`/fragments/${frgVals.frgId}`, {
        params: {user_id: frgVals.usrId}
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
      <Namebox frgName={frgVals.frgName} />
      <Headbox usrId={frgVals.usrId} crsId={frgVals.crsId} creAt={frgVals.creAt} updAt={frgVals.updAt} />
      <Editor readOnly={true} editorState={frgVals.editorState} blockRendererFn={blockRendererFn} />
      <Footbox isSelf={isSelf} frgVals={frgVals} />
    </>
  )
}

FrgView.propTypes = {
  initState: PropTypes.object
}
