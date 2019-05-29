import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Editor, EditorState, convertFromRaw} from 'draft-js'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setCclStr} from 'components/layouts/axios/then_catch_funcs'
import {Namebox} from 'components/fragments/draftjs/frg_view/namebox'
import {Headbox} from 'components/fragments/draftjs/frg_view/headbox'
import {Footbox} from 'components/fragments/draftjs/frg_view/footbox'

export const FrgView = ({initState, onGenChange}) => {
  const [frgVals, setFrgVals] = useState(initState)

  /* FrgView : editorState 復元, frgVals 更新 */
  const bufFrgVals = ({
    id: frgId,
    name: frgName,
    content: rawContent,
    user_id: usrId,
    crystal_id: crsId,
    created_at: creAt,
    updated_at: updAt
  }) => {
    const contentState = convertFromRaw(rawContent)
    const editorState = EditorState.createWithContent(contentState)
    setFrgVals({frgId, frgName, editorState, usrId, crsId, creAt, updAt})
  }

  // location.state がなかった時だけ通信

  /* didMount, willUnMount */
  useEffect(() => {
    const frgId = 1 // あとで取得する
    axiosRails
      .get(`/fragments/${frgId}`)
      .then((response) => {
        bufFrgVals(response.data)
      })
      .catch((error) => {
        onGenChange(setCclStr(error))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  /* form */
  return (
    <>
      <Namebox frgName={frgVals.frgName} />
      <Headbox usrId={frgVals.usrId} crsId={frgVals.crsId} creAt={frgVals.creAt} updAt={frgVals.updAt} />
      <Editor readOnly={true} editorState={frgVals.editorState} />
      <Footbox frgVals={frgVals} onGenChange={onGenChange} />
    </>
  )
}

FrgView.propTypes = {
  initState: PropTypes.object,
  onGenChange: PropTypes.func
}
