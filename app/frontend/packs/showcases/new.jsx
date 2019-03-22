import React from 'react'
import ReactDOM from 'react-dom'
import {Hoge} from 'components/showcases/hoge'

console.log('packs / showcases / new.jsx')
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Hoge />, document.getElementById('hoge'))
})
