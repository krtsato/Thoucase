import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {setToken, setFlashStr, setErrObj} from 'components/layouts/axios/then_catch_funcs'

export const SigninForm = ({onGenChange}) => {
  const [redrPath, setRedrPath] = useState(null)
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  /* Form 更新 */
  const onChange = (e) => {
    const inputName = e.target.name
    const inputVal = e.target.value
    setFormValue((nextState) => ({...nextState, [inputName]: inputVal}))
  }

  /* サインイン */
  const onClick = () => {
    axiosRails
      .post('/signin', {
        email: formValue.email,
        password: formValue.password
      })
      .then((response) => {
        setToken('authToken', response.headers.authorization)
        onGenChange(setFlashStr(response.headers.flash))
        setRedrPath(<Redirect to='/fragments' />) // リダイレクト
      })
      .catch((error) => {
        onGenChange(setErrObj(error))
        setFormValue({email: error.response.data.email, password: error.response.data.password})
      })
  }

  /* Form */
  return (
    <>
      {redrPath}
      <div className='formBody'>
        <label htmlFor='email'>
          <input id='email' name='email' type='text' value={formValue.email} onChange={onChange} />
          E-mail
        </label>
        <label htmlFor='password'>
          Password
          <input id='password' name='password' type='text' value={formValue.password} onChange={onChange} />
        </label>
        <button type='button' onClick={onClick}>
          Signin
        </button>
      </div>
    </>
  )
}

SigninForm.propTypes = {
  onGenChange: PropTypes.func
}
