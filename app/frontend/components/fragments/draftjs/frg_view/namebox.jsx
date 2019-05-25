import React from 'react'
import PropTypes from 'prop-types'

export const Namebox = ({frgName}) => <h1>{frgName}</h1>

Namebox.propTypes = {
  frgName: PropTypes.string
}
