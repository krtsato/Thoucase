import React from 'react'
import PropTypes from 'prop-types'

export const ShwLink = ({shwId, setCrystal}) => {
  const shwIdChange = (e) => {
    const id = e.target.value
    setCrystal((unChanged) => ({...unChanged, shwId: id}))
  }

  return <p>登録中のショーケース : {shwId}</p>
}

ShwLink.propTypes = {
  shwId: PropTypes.number,
  setCrystal: PropTypes.func
}
