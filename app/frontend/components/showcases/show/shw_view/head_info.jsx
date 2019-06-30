import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {dateFormat} from 'components/layouts/date_format'

export const HeadInfo = ({user, creAt, updAt}) => {
  /* user リンク表示 */
  const userLink = (usr) => (
    <Link to={{pathname: `/users/${usr.id}`, state: usr}}>
      <p>作成者 : {usr.name}</p>
    </Link>
  )

  return (
    <aside className='shwHeadInfo'>
      {userLink(user)}
      <time>作成日 : {dateFormat(creAt)}</time> | <time>更新日 : {dateFormat(updAt)}</time>
    </aside>
  )
}

HeadInfo.propTypes = {
  user: PropTypes.object,
  creAt: PropTypes.string,
  updAt: PropTypes.string
}
