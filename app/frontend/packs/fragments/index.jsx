import React from 'react'
import ReactDOM from 'react-dom'
import {FragmentsList} from 'components/fragments/fragments_list'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<FragmentsList />, document.getElementById('fragmentsIndex'))
})
