import React, {useState} from 'react'
import {axiosRails} from 'components/axios/instances'

export const LoginBody = () => {
  const [errorElem, setErrorElem] = useState(null)
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
    axiosRails({
      method: 'post',
      url: '/login.json',
      data: formValue
    })
      .then((response) => {
        console.log(`Res / Data: ${response.data}`)
      })
      .catch((error) => {
        console.log(`Err / Status : ${error.response.status}`)
        console.log(`Err / SttsTxt: ${error.response.statusText}`)
        console.log(`Err / Headers : ${JSON.stringify(error.response.headers)}`)
        console.log(`Err / Data : ${JSON.stringify(error.response.data, undefined, 2)}`)
        setFormValue({email: error.response.data.email, password: error.response.data.password})
        setErrorElem(<div className='formError'>{error.message}</div>)
      })
  }

  return (
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
        Login
      </button>
    </div>
  )
}
