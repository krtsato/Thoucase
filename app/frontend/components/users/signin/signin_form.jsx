import React, {useState, useContext} from 'react'
import {RedrContext, SigninContext, FlashContext} from 'components/layouts/app/context'
import {Redirect} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {setToken, transFlash} from 'components/layouts/axios/then_catch_funcs'

export const SigninForm = () => {
  const {setRedrPath} = useContext(RedrContext)
  const {setIsSignin} = useContext(SigninContext)
  const {setFlashMsg} = useContext(FlashContext)
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
  const postSnin = () => {
    axiosRails
      .post('/signin', {
        user: {email: formVals.email, password: formVals.password}
      })
      .then((response) => {
        setToken('authToken', response.headers.authorization)
        setIsSignin(true)
        setFlashMsg(transFlash(response.headers.flash))
        setRedrPath(<Redirect exact to='/fragments' />) // リダイレクト
      })
      .catch((error) => {
        setFlashMsg(transFlash(error.response.headers.flash))
        setFormVals({email: error.response.data.email, password: error.response.data.password})
      })
  }

  /* signin Enter 実行 */
  const onEnterDown = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      postSnin()
    }
  }

  /* signin ボタン押下 実行 */
  const onSninClick = () => {
    postSnin()
  }

  /* form */
  return (
    <div className='formBody'>
      <label htmlFor='email'>
        E-mail
        <input
          id='email'
          name='email'
          type='text'
          required
          autoFocus
          value={formVals.email}
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
          value={formVals.password}
          onChange={onFormChange}
        />
      </label>
      <button type='button' onClick={onSninClick} onKeyDown={onEnterDown}>
        Signin
      </button>
    </div>
  )
}
