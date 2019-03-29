import React from 'react'
import {axiosRailsCrud} from 'packs/layouts/axios'

export const LoginBody = () => {
  const email = ''
  const password = ''
  let formError = null

  const onClick = () => {
    axiosRailsCrud({
      method: 'post',
      url: '/login',
      data: {email, password}
    }).catch((error) => {
      formError = <div className='formError'>`${error}`</div>
    })
  }

  return (
    <div className='formBody'>
      {formError}
      <label htmlFor='email'>
        E-mail : <input id='email' name='email' value={email} />
      </label>
      <label htmlFor='email'>
        Password : <input id='password' name='password' value={password} />
      </label>
      <button type='button' onClick={onClick}>
        Login
      </button>
    </div>
  )
}
