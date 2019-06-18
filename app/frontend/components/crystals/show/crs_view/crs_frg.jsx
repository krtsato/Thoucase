import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export const CrsFrg = ({fragments}) => {
  let frgList = null // return

  /* 単位フラグメント */
  const setFragment = (frg) => (
    <Link
      to={{
        pathname: `/fragments/${frg.id}`,
        state: frg
      }}>
      <p>name : {frg.name}</p>
      <p>created_at : {frg.created_at}</p>
    </Link>
  )

  /* fragments 一覧 */
  if (fragments !== []) {
    frgList = (
      <ul>
        {fragments.map((fragment) => (
          <li key={fragment.id}>{setFragment(fragment)}</li>
        ))}
      </ul>
    )
  }

  return frgList
}

CrsFrg.propTypes = {
  fragments: PropTypes.array
}
