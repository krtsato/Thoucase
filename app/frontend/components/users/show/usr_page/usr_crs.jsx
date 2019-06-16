import React from 'react'
import PropTypes from 'prop-types'

export const UsrCrs = ({crystals}) => {
  return (
    <ul>
      {crystals.map((crystal) => (
        <li key={crystal.id}>
          <p>name : {crystal.name}</p>
          <p>showcase_id : {crystal.showcase_id}</p>
          <p>created_at : {crystal.created_at}</p>
          <p>updated_at : {crystal.updated_at}</p>
        </li>
      ))}
    </ul>
  )
}

UsrCrs.propTypes = {
  crystals: PropTypes.array
}
