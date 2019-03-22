import React from 'react'
import ReactDOM from 'react-dom'
import {RichEditor} from 'components/fragments/rich_editor'

console.log('packs / fragments / new.jsx')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<RichEditor />, document.getElementById('richEditor'))
})