import React from 'react'
import PropTypes from 'prop-types'
import {CrsList} from 'components/crystals/index/crs_list'

export const CrsIndex = ({onGenChange}) => {
  onGenChange({sninBool: !!localStorage.getItem('authToken')})

  return (
    <>
      <h2>crystals#index</h2>
      <CrsList onGenChange={onGenChange} />
    </>
  )
}

CrsIndex.propTypes = {
  onGenChange: PropTypes.func
}
