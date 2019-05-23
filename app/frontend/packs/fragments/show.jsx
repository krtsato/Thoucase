import React from 'react'
import PropTypes from 'prop-types'
// import {FrgHoge} from 'components/fragments/index/frg_list'

export const FrgShow = ({onGenChange}) => {
  onGenChange({sninBool: !!localStorage.getItem('authToken')})

  return (
    <>
      <h2>fragments#show</h2>
      {/* <FrgHoge onGenChange={onGenChange} /> */}
    </>
  )
}

FrgShow.propTypes = {
  onGenChange: PropTypes.func
}
