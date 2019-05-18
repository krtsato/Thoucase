import React from 'react'
import PropTypes from 'prop-types'
import {FrgEditor} from 'components/fragments/draftjs/frg_editor'

export const FrgForm = ({onGenChange}) => {
  return <FrgEditor onGenChange={onGenChange} />
}

FrgForm.propTypes = {
  onGenChange: PropTypes
}
