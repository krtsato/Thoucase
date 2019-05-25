import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Editor, EditorState, convertFromRaw} from 'draft-js'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setCclStr} from 'components/layouts/axios/then_catch_funcs'
import {Namebox} from 'components/fragments/draftjs/frg_view/namebox'
import {Headbox} from 'components/fragments/draftjs/frg_view/headbox'
import {Footbox} from 'components/fragments/draftjs/frg_view/footbox'

export const FrgView = ({redrState, onGenChange}) => {
  const [frgVals, setFrgVals] = useState({
    frgId: null,
    frgName: '',
    editorState: EditorState.createEmpty(),
    usrId: null,
    crsId: null,
    creAt: null,
    updAt: null
  })

  /* editorState 復元, frgVals 更新 */
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

  /* didMount, willUnMount */
  useEffect(() => {
    let frgObj = {}
    if (redrState) {
      frgObj = redrState
    } else {
      const frgId = 1 // あとで取得する
      axiosRails
        .get(`/fragments/${frgId}`)
        .then((response) => {
          frgObj = response.data
        })
        .catch((error) => {
          onGenChange(setCclStr(error))
        })
    }
    bufFrgVals(frgObj)
    return () => {
      canceller.cancel
    }
  }, [])

  return (
    <>
      <Namebox frgName={frgVals.frgName} />
      <Headbox usrId={frgVals.usrId} crsId={frgVals.crsId} creAt={frgVals.creAt} updAt={frgVals.updAt} />
      <Editor readOnly={true} editorState={frgVals.editorState} />
      <Footbox frgId={frgVals.frgId} onGenChange={onGenChange} />
    </>
  )
}

FrgView.propTypes = {
  redrState: PropTypes.object,
  onGenChange: PropTypes.func
}
