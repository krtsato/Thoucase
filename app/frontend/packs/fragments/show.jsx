import React from 'react'
import PropTypes from 'prop-types'
import {EditorState, convertFromRaw} from 'draft-js'
import {FrgView} from 'components/fragments/draftjs/frg_view'

export const FrgShow = ({location, onGenChange}) => {
  /*
    linked by FrgList
    redirected from FrgForm
  */
  let initState = null
  if (location.state) {
    location.state.content = convertFromRaw(location.state.content)
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
  console.log(`initState : ${JSON.stringify(initState, undefined, 2)}`)

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
