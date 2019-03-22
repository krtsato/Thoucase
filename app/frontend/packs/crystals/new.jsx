import React from 'react'
import ReactDOM from 'react-dom'
import {Hoge} from 'components/crystals/hoge'

console.log('packs / crystals / new.jsx')
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Hoge />, document.getElementById('hoge'))
})
