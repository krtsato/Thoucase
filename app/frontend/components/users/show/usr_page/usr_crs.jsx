import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {dateFormat} from 'components/layouts/date_format'

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
            <p>created_at : {dateFormat(crystal.created_at)}</p>
            <p>updated_at : {dateFormat(crystal.updated_at)}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

UsrCrs.propTypes = {
  crystals: PropTypes.array
}
