import React from 'react'
import PropTypes from 'prop-types'
import {EditorState, convertFromRaw} from 'draft-js'
import {FrgView} from 'components/fragments/draftjs/frg_view'

export const FrgShow = ({location, match}) => {
  /* FrgView : fragment state 初期化 */
  const initState = (state, id) => {
    if (state) {
      // from Link, Redirect except delete action
      const {
        id: frgId,
        name: frgName,
        content: rawContent,
        user_id: usrId,
        crystal_id: crsId,
        created_at: creAt,
        updated_at: updAt
      } = state
      const contentState = convertFromRaw(rawContent)
      const editorState = EditorState.createWithContent(contentState)
      return {frgId, frgName, editorState, usrId, crsId, creAt, updAt}
    }

    // from URL query or Redirect by delete action
    return {
      frgId: parseInt(id, 10),
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
      <FrgView initState={initState(location.state, match.params.id)} />
    </>
  )
}

FrgShow.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
}
