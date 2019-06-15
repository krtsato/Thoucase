import React from 'react'
import PropTypes from 'prop-types'
import {EditorState, convertFromRaw} from 'draft-js'
import {FrgView} from 'components/fragments/draftjs/frg_view'

export const FrgShow = ({location, match}) => {
  /* FrgView : frgVals 初期化 */
  let initState = null
  if (location.state) {
    // Link, Redirect から遷移して来る場合
    const {
      id: frgId,
      name: frgName,
      content: rawContent,
      user_id: usrId,
      crystal_id: crsId,
      created_at: creAt,
      updated_at: updAt
    } = location.state
    const contentState = convertFromRaw(rawContent)
    const editorState = EditorState.createWithContent(contentState)
    initState = {frgId, frgName, editorState, usrId, crsId, creAt, updAt}
  } else {
    // URL から遷移して来る場合
    initState = {
      frgId: match.params.id,
      frgName: '',
      editorState: EditorState.createEmpty(),
      usrId: null,
      crsId: null,
      creAt: null,
      updAt: null
    }
  }

  return (
    <>
      <h2>fragments#show</h2>
      <FrgView initState={initState} />
    </>
  )
}

FrgShow.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
}
