import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {dateFormat} from 'components/layouts/date_format'

export const UsrCrs = ({crystals, showcases}) => {
  /* showcase に登録していれば 表示 */
  const shwcaseLink = (shws, index) => {
    const shw = shws[index]
    if (!shw) return null
    return (
      <Link to={{pathname: `/showcases/${shw.id}`, state: shw}}>
        <p>展示中のショーケース : {shw.name}</p>
      </Link>
    )
  }

  return (
    <ul>
      {crystals.map((crystal, index) => (
        <li key={crystal.id}>
          <Link
            to={{
              pathname: `/crystals/${crystal.id}`,
              state: crystal
            }}>
            <p>name : {crystal.name}</p>
            <p>ここで立体描画をする</p>
            <p>created_at : {dateFormat(crystal.created_at)}</p>
            <p>updated_at : {dateFormat(crystal.updated_at)}</p>
            <p>ここで原著者を表示する</p>
          </Link>
          {shwcaseLink(showcases, index)}
        </li>
      ))}
    </ul>
  )
}

UsrCrs.propTypes = {
  showcases: PropTypes.array,
  crystals: PropTypes.array
}
