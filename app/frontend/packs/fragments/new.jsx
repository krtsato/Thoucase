import React from 'react'
import {EditorState} from 'draft-js'
import {FrgForm} from 'components/fragments/draftjs/frg_form'

export const FrgNew = () => {
  const reqMethod = 'post'
  const initState = {frgId: null, frgName: '', crsId: null, editorState: EditorState.createEmpty()}

  return (
    <>
      <h2>fragments#new</h2>
      <FrgForm reqMethod={reqMethod} initState={initState} />
    </>
  )
}
