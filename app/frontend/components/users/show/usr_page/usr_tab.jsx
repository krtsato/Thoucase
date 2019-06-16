import React from 'react'
import PropTypes from 'prop-types'

export const UsrTab = ({setActiveFlag}) => {
  setTimeout(setActiveFlag('frg'), 1500)
  return <h3>UserTab</h3>
}

UsrTab.propTypes = {
  setActiveFlag: PropTypes.func
}
