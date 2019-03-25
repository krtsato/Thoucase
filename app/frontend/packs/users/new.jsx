import React from 'react'
import ReactDOM from 'react-dom'
import {Hoge} from 'components/users/hoge'

console.log('packs / users / new.jsx')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Hoge />, document.getElementById('hoge'))
})
