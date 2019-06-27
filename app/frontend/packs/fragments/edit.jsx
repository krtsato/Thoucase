import React from 'react'
import PropTypes from 'prop-types'
import {FrgForm} from 'components/fragments/draftjs/frg_form'

export const FrgEdit = ({location}) => {
  /* redirect from FrgView */
  const reqMethod = 'patch'

  return (
    <>
      <h2>fragments#edit</h2>
      <FrgForm reqMethod={reqMethod} initState={location.state} />
    </>
  )
}

FrgEdit.propTypes = {
  location: PropTypes.object
}
