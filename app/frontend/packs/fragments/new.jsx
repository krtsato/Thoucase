console.log('Hello, packs / fragments / new.jsx')
import React from 'react'
import ReactDOM from 'react-dom'
import {RichEditor} from 'components/fragments/rich_editor'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<RichEditor />, document.getElementById('richEditor'))
})