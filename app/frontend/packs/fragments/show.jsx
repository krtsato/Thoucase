import React from 'react'
import ReactDOM from 'react-dom'
import {RichViewer} from 'components/fragments/rich_viewer'

console.log('packs / fragments / show.jsx')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<RichViewer />, document.getElementById('richViewer'))
})