import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {setToken, setFlashStr, setSninBool} from 'components/layouts/axios/then_catch_funcs'

export const SigninForm = ({onGenChange}) => {
  const [redrPath, setRedrPath] = useState(null)
  const [formVals, setFormVals] = useState({
    email: '',
    password: ''
  })

  /* form 更新 */
  const onFormChange = (e) => {
    const inputName = e.target.name
    const inputVal = e.target.value
    setFormVals((nextState) => ({...nextState, [inputName]: inputVal}))
  }

  /* signin */
  const onSninClick = () => {
    axiosRails
      .post('/signin', {
        user: {email: formVals.email, password: formVals.password}
      })
      .then((response) => {
        setToken('authToken', response.headers.authorization)
        onGenChange(Object.assign(setSninBool(response.headers.flash), setFlashStr(response.headers.flash)))
        setRedrPath(<Redirect to='/fragments' />) // リダイレクト
      })
      .catch((error) => {
        onGenChange(setFlashStr(error.response.headers.flash))
        setFormVals({email: error.response.data.email, password: error.response.data.password})
      })
  }

  /* form */
  return (
    <>
      {redrPath}
      <div className='formBody'>
        <label htmlFor='email'>
          E-mail
          <input
            id='email'
            name='email'
            type='text'
            required
            autoFocus
            defaultValue={formVals.email}
            onChange={onFormChange}
          />
        </label>
        <label htmlFor='password'>
          Password
          <input
            id='password'
            name='password'
            type='text'
            required
            defaultValue={formVals.password}
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
