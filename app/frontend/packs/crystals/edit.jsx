import React from 'react'
import PropTypes from 'prop-types'
import {CrsForm} from 'components/crystals/edit/crs_form'

export const CrsEdit = ({location}) => {
  /* redirect from CrsView */
  const {crsId, crsName, shwId} = location.state
  const initState = {crsId, crsName, shwId}

  return (
    <>
      <h2>crystals#edit</h2>
      <CrsForm initState={initState} />
    </>
  )
}

CrsEdit.propTypes = {
  location: PropTypes.object
}
