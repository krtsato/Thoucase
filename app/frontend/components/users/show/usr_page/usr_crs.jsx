import React from 'react'
import PropTypes from 'prop-types'

export const UsrCrs = ({crystals}) => {
  console.log(`crystals : ${JSON.stringify(crystals, undefined, 2)}`)
  return <h3>UserCrs</h3>
}

UsrCrs.propTypes = {
  crystals: PropTypes.array
}
