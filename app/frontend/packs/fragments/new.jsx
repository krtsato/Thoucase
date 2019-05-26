import React from 'react'
import PropTypes from 'prop-types'
import {FrgForm} from 'components/fragments/draftjs/frg_form'

export const FrgNew = ({onGenChange}) => (
  <>
    <h2>fragments#new</h2>
    <FrgForm onGenChange={onGenChange} />
  </>
)

FrgNew.propTypes = {
  onGenChange: PropTypes.func
}
