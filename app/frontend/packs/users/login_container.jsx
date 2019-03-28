import React from 'react'
import ReactDOM from 'react-dom'
import {LoginForm} from 'components/users/login_form'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<LoginForm />, document.getElementById('loginContainer'))
})
