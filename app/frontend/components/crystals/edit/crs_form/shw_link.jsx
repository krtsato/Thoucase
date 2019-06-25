import React from 'react'
import PropTypes from 'prop-types'

export const ShwLink = ({shwId, setCrsVals}) => {
  const shwIdChange = (e) => {
    const id = e.target.value
    setCrsVals((unChanged) => ({...unChanged, shwId: id}))
  }

  return <p>登録中のショーケース : {shwId}</p>
}

ShwLink.propTypes = {
  shwId: PropTypes.number,
  setCrsVals: PropTypes.func
}
