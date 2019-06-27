import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

export const EditBtn = withRouter(({history, frgVals}) => {
  /* fragment 編集 */
  const onEditClick = () => {
    const location = {pathname: `/fragments/${frgVals.frgId}/edit`, state: frgVals}
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
  frgVals: PropTypes.object
}
