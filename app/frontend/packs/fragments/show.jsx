import React from 'react'
import PropTypes from 'prop-types'
import {FrgView} from 'components/fragments/draftjs/frg_view'

export const FrgShow = ({location, onGenChange}) => {
  const redrState = location.state // from FrgForm redirect
  return (
    <>
      <h2>fragments#show</h2>
      <FrgView redrState={redrState} onGenChange={onGenChange} />
    </>
  )
}

FrgShow.propTypes = {
  location: PropTypes.object,
  onGenChange: PropTypes.func
}
