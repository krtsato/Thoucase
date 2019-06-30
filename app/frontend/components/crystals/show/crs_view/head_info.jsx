import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {dateFormat} from 'components/layouts/date_format'

export const HeadInfo = ({user, showcase, creAt, updAt}) => {
  /* ユーザ リンク表示 */
  const userLink = (usr) => (
    <Link to={{pathname: `/users/${usr.id}`, state: usr}}>
      <p>作成者 : {usr.name}</p>
    </Link>
  )

  /* showcase に登録していれば showcase リンク表示 */
  const shwcaseLink = (shw) =>
    shw ? (
      <Link to={{pathname: `/showcases/${shw.id}`, state: shw}}>
        <p>展示中のショーケース : {shw.name}</p>
      </Link>
    ) : null

  return (
    <aside className='crsHeadInfo'>
      {userLink(user)}
      <time>作成日 : {dateFormat(creAt)}</time> | <time>更新日 : {dateFormat(updAt)}</time>
      {shwcaseLink(showcase)}
    </aside>
  )
}
HeadInfo.propTypes = {
  user: PropTypes.object,
  showcase: PropTypes.object,
  creAt: PropTypes.string,
  updAt: PropTypes.string
}
