import React from 'react'
import ReactDOM from 'react-dom'
import {Hoge} from 'components/fragments/hoge'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Hoge />, document.getElementById('hoge'))
})
