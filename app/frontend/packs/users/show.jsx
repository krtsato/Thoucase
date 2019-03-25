import React from 'react'
import ReactDOM from 'react-dom'
import {Fuga} from 'components/users/fuga'

console.log('packs / users /show.jsx')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Fuga />, document.getElementById('fuga'))
})
