import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

export const EditBtn = withRouter(({history, crsVals}) => {
  /* crystal 編集 */
  const onEditClick = () => {
    const location = {pathname: `/crystals/${crsVals.crsId}/edit`, state: crsVals}
    history.push(location) // 編集途中で遷移すると, 次回以降リダイレクトされない不具合を回避
  }

  return (
    <button type='button' onClick={onEditClick}>
      編集
    </button>
  )
})

EditBtn.propTypes = {
  history: PropTypes.object,
  crsVals: PropTypes.object
}
