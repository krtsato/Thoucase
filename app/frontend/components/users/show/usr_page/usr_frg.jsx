import React from 'react'
import PropTypes from 'prop-types'

export const UsrFrg = ({frgVals}) => {
  console.log(`frgVals : ${JSON.stringify(frgVals, undefined, 2)}`)
  return <h3>UserFrg</h3>
}

UsrFrg.propTypes = {
  frgVals: PropTypes.object
}
