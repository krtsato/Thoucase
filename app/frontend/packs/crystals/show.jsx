import React from 'react'
import PropTypes from 'prop-types'
import {CrsView} from 'components/crystals/show/crs_view'

export const CrsShow = ({location, match}) => {
  /* CrsView : crsVals 初期化 */
  let initState = null
  if (location.state) {
    // Link, Redirect から遷移して来る場合
    const {
      id: crsId,
      name: crsName,
      user_id: usrId,
      showcase_id: shwId,
      created_at: creAt,
      updated_at: updAt
    } = location.state

    initState = {crsId, crsName, usrId, shwId, creAt, updAt}
  } else {
    // URL から遷移して来る場合
    initState = {
      crsId: match.params.id,
      crsName: '',
      usrId: null,
      shwId: null,
      creAt: null,
      updAt: null
    }
  }

  return (
    <>
      <h2>crystalss#show</h2>
      <CrsView initState={initState} />
    </>
  )
}

CrsShow.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
}
