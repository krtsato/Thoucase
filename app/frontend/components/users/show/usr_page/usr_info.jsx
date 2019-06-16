import React from 'react'
import PropTypes from 'prop-types'

export const UsrInfo = ({usrVals}) => {
  console.log(`usrVals : ${JSON.stringify(usrVals, undefined, 2)}`)
  return <h3>UserInfo</h3>
}

UsrInfo.propTypes = {
  usrVals: PropTypes.object
}
