import React from 'react'
import PropTypes from 'prop-types'

export const Namebox = ({crsName}) => <h1 className='crsName'>{crsName}</h1>

Namebox.propTypes = {
  crsName: PropTypes.string
}
