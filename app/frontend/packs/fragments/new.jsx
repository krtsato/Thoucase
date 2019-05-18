import React from 'react'
import PropTypes from 'prop-types'
import {FrgForm} from 'components/fragments/new/frg_form'

export const FrgNew = ({onGenChange}) => {
  onGenChange({sninBool: !!localStorage.getItem('authToken')})

  return (
    <>
      <h2>fragments#new</h2>
      <FrgForm onGenChange={onGenChange} />
    </>
  )
}

FrgNew.propTypes = {
  onGenChange: PropTypes.func
}
