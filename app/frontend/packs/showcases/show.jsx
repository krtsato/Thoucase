import React from 'react'
import ReactDOM from 'react-dom'
import {Fuga} from 'components/showcases/fuga'

console.log('packs / showcases / show.jsx')
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Fuga />, document.getElementById('fuga'))
})
