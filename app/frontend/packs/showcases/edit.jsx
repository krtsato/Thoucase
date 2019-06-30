import React from 'react'
import PropTypes from 'prop-types'
import {ShwForm} from 'components/showcases/edit/shw_form'

export const ShwEdit = ({location}) => (
  /* redirect from ShwView */
  <>
    <h2>showcases#edit</h2>
    <ShwForm initState={location.state} />
  </>
)

ShwEdit.propTypes = {
  location: PropTypes.object
}
