import React from 'react'
import PropTypes from 'prop-types'
import {FrgForm} from 'components/fragments/draftjs/frg_form'

export const FrgEdit = ({location}) => {
  /* redirect from FrgView */
  const reqMethod = 'patch'
  const {frgId, frgName, crsId, editorState} = location.state
  const initState = {frgId, frgName, crsId, editorState}

  return (
    <>
      <h2>fragments#edit</h2>
      <FrgForm reqMethod={reqMethod} initState={initState} />
    </>
  )
}

FrgEdit.propTypes = {
  location: PropTypes.object
}
