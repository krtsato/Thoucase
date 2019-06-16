import React from 'react'
import PropTypes from 'prop-types'

export const UsrCrs = ({crsVals}) => {
  console.log(`crsVals : ${JSON.stringify(crsVals, undefined, 2)}`)
  return <h3>UserCrs</h3>
}

UsrCrs.propTypes = {
  crsVals: PropTypes.object
}
