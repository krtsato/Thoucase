import React from 'react'
import PropTypes from 'prop-types'

export const UsrFrg = ({fragments}) => {
  console.log(`fragments : ${JSON.stringify(fragments, undefined, 2)}`)
  return <h3>UserFrg</h3>
}

UsrFrg.propTypes = {
  fragments: PropTypes.array
}
