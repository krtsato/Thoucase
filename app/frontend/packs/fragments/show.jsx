import React from 'react'
import PropTypes from 'prop-types'
import {EditorState} from 'draft-js'
import {FrgView} from 'components/fragments/draftjs/frg_view'

export const FrgShow = ({location, onGenChange}) => {
  /*
    linked by FrgList
    redirected from FrgForm
  */
  let initState = null
  if (location.state) {
    initState = location.state
  } else {
    initState = {
      frgId: null,
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
      <FrgView initState={initState} onGenChange={onGenChange} />
    </>
  )
}

FrgShow.propTypes = {
  location: PropTypes.object,
  onGenChange: PropTypes.func
}
