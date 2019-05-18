import React from 'react'
import PropTypes from 'prop-types'

export const About = ({onGenChange}) => {
  onGenChange({sninBool: !!localStorage.getItem('authToken')})
  return <h2>home#about</h2>
}

About.propTypes = {
  onGenChange: PropTypes.func
}
