import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export const ShwCrs = ({crystals}) => {
  /* 単位クリスタル */
  const setCrystal = (crs) => (
    <Link
      to={{
        pathname: `/crystals/${crs.id}`,
        state: crs
      }}>
      {/* ここで立体描画 */}
      <p>name : {crs.name}</p>
      <p>created_at : {crs.created_at}</p>
      {/* ここで原著者表示 */}
    </Link>
  )

  /* fragments 一覧 */
  return (
    <ul>
      {crystals.map((crystal) => (
        <li key={crystal.id}>{setCrystal(crystal)}</li>
      ))}
    </ul>
  )
}

ShwCrs.propTypes = {
  crystals: PropTypes.array
}
