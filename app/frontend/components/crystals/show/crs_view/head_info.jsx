import React from 'react'
import PropTypes from 'prop-types'
import {dateFormat} from 'components/layouts/date_format'

export const HeadInfo = ({usrName, shwName, creAt, updAt}) => {
  /* showcase に登録していれば 表示 */
  const shwcaseLink = (name) => {
    if (name) return <span>ショーケース : {name}</span>
    return null
  }

  return (
    <aside className='crsHeadInfo'>
      <span>作成者 : {usrName}</span>
      <time>作成日 : {dateFormat(creAt)}</time>
      <time>更新日 : {dateFormat(updAt)}</time>
      {shwcaseLink(shwName)}
    </aside>
  )
}
HeadInfo.propTypes = {
  usrName: PropTypes.string,
  shwName: PropTypes.string,
  creAt: PropTypes.string,
  updAt: PropTypes.string
}
