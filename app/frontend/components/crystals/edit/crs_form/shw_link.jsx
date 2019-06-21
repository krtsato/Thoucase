import React from 'react'
import PropTypes from 'prop-types'

export const ShwLink = ({shwId, bufShwIdChange}) => {
  const shwIdChange = (e) => {
    bufShwIdChange(e.target.value)
  }
  return <p>登録中のショーケース : {shwId}</p>
}

ShwLink.propTypes = {
  shwId: PropTypes.number,
  bufShwIdChange: PropTypes.func
}
