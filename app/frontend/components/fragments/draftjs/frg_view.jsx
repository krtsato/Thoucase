import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Editor, EditorState, convertFromRaw} from 'draft-js'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setCclStr} from 'components/layouts/axios/then_catch_funcs'

export const FrgView = ({redrState, onGenChange}) => {
  const [frgVals, setFrgVals] = useState({
    frgId: null,
    frgName: '',
    editorState: EditorState.createEmpty(),
    crsId: null
  })

  /* didMount, willUnMount */
  useEffect(() => {
    if (redrState) {
      const {frgId, frgName, rawFrg, crsId} = redrState
      bufFrgVals(frgId, frgName, rawFrg, crsId)
    } else {
      const frgId = 1 // あとで取得する
      axiosRails
        .get(`/fragments/${frgId}`)
        .then((response) => {
          const {name, content, crystal_id} = response.data
          bufFrgVals(frgId, name, content, crystal_id)
        })
        .catch((error) => {
          onGenChange(setCclStr(error))
        })
    }
    return () => {
      canceller.cancel
    }
  }, [])

  /*
    editorState 復元
    frgVals 更新
  */
  const bufFrgVals = (frgId, frgName, rawContent, crsId) => {
    console.log(`rawCont : ${rawContent}`)
    const contentState = convertFromRaw(rawContent)
    const editorState = EditorState.createWithContent(contentState)
    setFrgVals({frgId, frgName, editorState, crsId})
  }

  return (
    <>
      {/* Namebox */}
      <Editor readOnly={true} editorState={frgVals.editorState} />
      {/* 編集ボタン */}
      {/* 削除ボタン */}
    </>
  )
}

FrgView.propTypes = {
  redrState: PropTypes.object,
  onGenChange: PropTypes.func
}
