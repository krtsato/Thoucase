import React from 'react'
import ReactDOM from 'react-dom'
import {RichViewer} from 'components/fragments/rich_viewer'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<RichViewer />, document.getElementById('richViewer'))
})
