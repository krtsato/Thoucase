import React, {useState, useContext} from 'react'
import {RedrContext, SigninContext, FlashContext, InvldContext} from 'components/layouts/app/context'
import {Redirect} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {validCheck} from 'components/layouts/axios/validate'
import {setToken, transFlash} from 'components/layouts/axios/then_catch_funcs'

export const SigninForm = () => {
  const {setRedrPath} = useContext(RedrContext)
  const {setIsSignin} = useContext(SigninContext)
  const {setFlashMsg} = useContext(FlashContext)
  const {setInvldMsg} = useContext(InvldContext)
  const [formVals, setFormVals] = useState({
    email: '',
    passwd: ''
  })

  /* form 更新 */
  const onFormChange = (e) => {
    const inputName = e.target.name
    const inputVal = e.target.value
    setFormVals((unChanged) => ({...unChanged, [inputName]: inputVal}))
  }

  /* signin */
  const postSnin = () => {
    const check = validCheck({email: formVals.email, passwd: formVals.passwd})
    if (check[0]) {
      setInvldMsg(check[1]) // validation エラーメッセージ
    } else {
      axiosRails
        .post('/signin', {
          user: {email: formVals.email, password: formVals.passwd}
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
  }

  /* signin Enter 実行 */
  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
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
      <label htmlFor='passwd'>
        Password
        <input
          id='passwd'
          name='passwd'
          type='text'
          required
          value={formVals.passwd}
          onChange={onFormChange}
          onKeyDown={onEnterDown}
        />
      </label>
      <button type='button' onClick={onSninClick} onKeyDown={onEnterDown}>
        Signin
      </button>
    </div>
  )
}
