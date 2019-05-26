import React from 'react'
import PropTypes from 'prop-types'

export const EditBtn = ({frgId}) => {
  const onEditClick = (e) => {
    e.preventDefault()
    // redirect?
  }

  return (
    <button type='button' onClick={onEditClick}>
      編集
    </button>
  )
}

EditBtn.propTypes = {
  frgId: PropTypes.number
}
