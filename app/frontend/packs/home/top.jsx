import React from 'react'
import PropTypes from 'prop-types'

export const Top = ({onGenChange}) => {
  onGenChange({sninBool: !!localStorage.getItem('authToken')})
  return <h2>home#top</h2>
}

Top.propTypes = {
  onGenChange: PropTypes.func
}
