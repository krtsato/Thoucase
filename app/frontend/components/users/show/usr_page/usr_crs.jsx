import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export const UsrCrs = ({crystals}) => {
  // ここで立体描画処理
  return (
    <ul>
      {crystals.map((crystal) => (
        <li key={crystal.id}>
          <Link
            to={{
              pathname: `/crystals/${crystal.id}`,
              state: crystal
            }}>
            <p>name : {crystal.name}</p>
            <p>showcase_id : {crystal.showcase_id}</p>
            <p>created_at : {crystal.created_at}</p>
            <p>updated_at : {crystal.updated_at}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

UsrCrs.propTypes = {
  crystals: PropTypes.array
}
