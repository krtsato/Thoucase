import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {setToken, setFlashStr} from 'components/layouts/axios/then_catch_funcs'

export const SigninForm = ({onGenChange}) => {
  const [redrPath, setRedrPath] = useState(null)
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  /* form 更新 */
  const onFormChange = (e) => {
    const inputName = e.target.name
    const inputVal = e.target.value
    setFormValue((nextState) => ({...nextState, [inputName]: inputVal}))
  }

  /* signin */
  const onSninClick = () => {
    axiosRails
      .post('/signin', {
        user: {email: formValue.email, password: formValue.password}
      })
      .then((response) => {
        setToken('authToken', response.headers.authorization)
        onGenChange(setFlashStr(response.headers.flash))
        setRedrPath(<Redirect to='/fragments' />) // リダイレクト
      })
      .catch((error) => {
        onGenChange(setFlashStr(error.response.headers.flash))
        setFormValue({email: error.response.data.email, password: error.response.data.password})
      })
  }

  /* form */
  return (
    <>
      {redrPath}
      <div className='formBody'>
        <label htmlFor='email'>
          <input
            id='email'
            name='email'
            type='text'
            required
            autoFocus
            value={formValue.email}
            onChange={onFormChange}
          />
          E-mail
        </label>
        <label htmlFor='password'>
          Password
          <input
            id='password'
            name='password'
            type='text'
            required
            value={formValue.password}
            onChange={onFormChange}
          />
        </label>
        <button type='button' onClick={onSninClick}>
          Signin
        </button>
      </div>
    </>
  )
}

SigninForm.propTypes = {
  onGenChange: PropTypes.func
}
