import React from 'react'
import ReactDOM from 'react-dom'
import {Fizz} from 'components/crystals/fizz'

console.log('packs / crystals / show.jsx')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Fizz />, document.getElementById('buzz'))
})