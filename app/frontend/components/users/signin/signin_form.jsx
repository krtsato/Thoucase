import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'

export const SigninForm = () => {
  let tglSigninForm = null
  const [errorElem, setErrorElem] = useState(null)
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  /* フォーム 更新 */
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
        /* サインイン状態で表示変更 */
        const isSignin = localStorage.getItem('token') === true
        if (response.status === 200 && isSignin) {
          tglSigninForm = <Redirect to='/fragments' />
        }
      })
      .catch((error) => {
        console.log(`Err / Status : ${error.response.status}`)
        setFormValue({email: error.response.data.email, password: error.response.data.password})
        setErrorElem(<div className='formError'>{error.message}</div>)
      })
  }

  tglSigninForm = (
    <>
      <div className='formBody'>
        {errorElem}
        <label htmlFor='email'>
          E-mail
          <input id='email' name='email' type='text' value={formValue.email} onChange={onChange} />
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

  return tglSigninForm // 要修正
}
