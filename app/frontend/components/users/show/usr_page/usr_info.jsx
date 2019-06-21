import React from 'react'
import PropTypes from 'prop-types'
import {dateFormat} from 'components/layouts/date_format'

export const UsrInfo = ({user}) => {
  // ここで user の update 処理
  return (
    <div className='userInfo'>
      <p>name : {user.name}</p>
      <p>created_at : {dateFormat(user.created_at)}</p>
    </div>
  )
}

UsrInfo.propTypes = {
  user: PropTypes.object
}
