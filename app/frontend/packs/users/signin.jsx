import React from 'react'
import PropTypes from 'prop-types'
import {SigninForm} from 'components/users/signin/signin_form'

export const Signin = ({onGenChange}) => (
  <>
    <h2>users#signin</h2>
    <SigninForm onGenChange={onGenChange} />
  </>
)

Signin.propTypes = {
  onGenChange: PropTypes.func
}
