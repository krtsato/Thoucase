import React, {useState} from 'react'
import {axiosCrud} from 'components/axios/instances'

export const LoginBody = () => {
  let formError = null
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const onChange = (e) => {
    const inputName = e.target.name
    const inputVal = e.target.value
    setFormValue((nextState) => ({...nextState, [inputName]: inputVal}))
  }

  const onClick = () => {
    axiosCrud({
      method: 'post',
      url: '/login',
      data: formValue
    }).catch((error) => {
      formError = <div className='formError'>`${error}`</div>
    })
  }

  return (
    <div className='formBody'>
      {formError}
      <label htmlFor='email'>
        E-mail
        <input id='email' name='email' type='text' value={formValue.email} onChange={onChange} />
      </label>
      <label htmlFor='password'>
        Password
        <input id='password' name='password' type='text' value={formValue.password} onChange={onChange} />
      </label>
      <button type='button' onClick={onClick}>
        Login
      </button>
    </div>
  )
}
