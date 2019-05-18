import React from 'react'
import PropTypes from 'prop-types'
import {FrgList} from 'components/fragments/index/frg_list'

export const FrgIndex = ({onGenChange}) => {
  onGenChange({sninBool: !!localStorage.getItem('authToken')})

  return (
    <>
      <h2>fragments#index</h2>
      <FrgList onGenChange={onGenChange} />
    </>
  )
}

FrgIndex.propTypes = {
  onGenChange: PropTypes.func
}
