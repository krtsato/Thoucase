import React from 'react'
import PropTypes from 'prop-types'

export const Headbox = ({usrName, shwName, creAt, updAt}) => {
  /* showcase に登録していれば 表示 */
  const shwcaseLink = (name) => {
    if (name) return <span>ショーケース : {name}</span>
    return null
  }

  return (
    <aside className='crsHead'>
      <span>作成者 : {usrName}</span>
      <time>作成日 : {creAt}</time>
      <time>更新日 : {updAt}</time>
      {shwcaseLink(shwName)}
    </aside>
  )
}
Headbox.propTypes = {
  usrName: PropTypes.string,
  shwName: PropTypes.string,
  creAt: PropTypes.string,
  updAt: PropTypes.string
}
