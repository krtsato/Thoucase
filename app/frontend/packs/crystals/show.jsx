import React from 'react'
import PropTypes from 'prop-types'
import {CrsView} from 'components/crystals/show/crs_view'

export const CrsShow = ({location, match}) => {
  /* CrsView : crsVals 初期化 */
  const initState = (state, id) => {
    // URL から遷移して来る場合
    if (!state) return {crsId: id, crsName: '', usrId: null, shwId: null, creAt: null, updAt: null}

    // Link, Redirect から遷移して来る場合
    const {
      id: crsId,
      name: crsName,
      user_id: usrId,
      showcase_id: shwId,
      created_at: creAt,
      updated_at: updAt
    } = state
    return {crsId, crsName, usrId, shwId, creAt, updAt}
  }

  return (
    <>
      <h2>crystals#show</h2>
      <CrsView initState={initState(location.state, match.params.id)} />
    </>
  )
}

CrsShow.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
}
