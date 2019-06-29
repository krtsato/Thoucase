import React from 'react'
import PropTypes from 'prop-types'
import {ShwView} from 'components/showcases/show/shw_view'

export const ShwShow = ({location, match}) => {
  /* CrsView : crsVals 初期化 */
  const initState = (state, id) => {
    // from Link, Redirect except delete action
    if (state) {
      const {id: shwId, name: shwName, user_id: usrId, created_at: creAt, updated_at: updAt} = state
      return {shwId, shwName, usrId, creAt, updAt}
    }

    // from URL query or Redirect by delete action
    return {shwId: parseInt(id, 10), shwName: '', usrId: null, creAt: null, updAt: null}
  }

  return (
    <>
      <h2>showcases#show</h2>
      <ShwView initState={initState(location.state, match.params.id)} />
    </>
  )
}

ShwShow.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
}
