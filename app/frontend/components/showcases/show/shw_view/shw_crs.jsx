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
      <p>name : {crs.name}</p>
      <p>ここで立体描画をする</p>
      <p>created_at : {crs.created_at}</p>
      <p>ここで原著者を表示する</p>
    </Link>
  )

  /* 展示中のクリスタル 一覧 */
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
