import React, {useState, useContext} from 'react'
import {SigninContext, FlashContext} from 'components/layouts/app/context'
import {Redirect} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {setToken, transFlash} from 'components/layouts/axios/then_catch_funcs'

export const SigninForm = () => {
  const {setIsSignin} = useContext(SigninContext)
  const {setFlashMsg} = useContext(FlashContext)
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
        setIsSignin(true)
        setFlashMsg(transFlash(response.headers.flash))
        setRedrPath(<Redirect to='/fragments' />) // リダイレクト
      })
      .catch((error) => {
        setFlashMsg(transFlash(error.response.headers.flash))
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
