import React from 'react'
import PropTypes from 'prop-types'
import {CrsForm} from 'components/crystals/edit/crs_form'

export const CrsEdit = ({location}) => (
  /* redirect from CrsView */
  <>
    <h2>crystals#edit</h2>
    <CrsForm initState={location.state} />
  </>
)

CrsEdit.propTypes = {
  location: PropTypes.object
}
