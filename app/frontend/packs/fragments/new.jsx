import React from 'react'
import PropTypes from 'prop-types'
import {EditorState} from 'draft-js'
import {FrgForm} from 'components/fragments/draftjs/frg_form'

export const FrgNew = ({onGenChange}) => {
  const initState = {frgId: null, frgName: '', crsId: null, editorState: EditorState.createEmpty()}

  return (
    <>
      <h2>fragments#new</h2>
      <FrgForm initState={initState} onGenChange={onGenChange} />
    </>
  )
}

FrgNew.propTypes = {
  onGenChange: PropTypes.func
}
