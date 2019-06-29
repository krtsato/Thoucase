import React from 'react'
import PropTypes from 'prop-types'
import {CrsView} from 'components/crystals/show/crs_view'

export const CrsShow = ({location, match}) => {
  /* CrsView : crystal state 初期化 */
  const initState = (state, id) => {
    // from Link, Redirect except delete action
    if (state) {
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

    // from URL query or Redirect by delete action
    return {crsId: parseInt(id, 10), crsName: '', usrId: null, shwId: null, creAt: null, updAt: null}
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
