import React from 'react'
import PropTypes from 'prop-types'

export const Metabox = ({usrId, crsId, creAt, updAt}) => {
  return (
    <aside>
      <span>作成者 : {usrId}</span>
      <span>クリスタル : {crsId}</span>
      <time>作成日 : {creAt}</time>
      <time>更新日 : {updAt}</time>
    </aside>
  )
}
Metabox.propTypes = {
  usrId: PropTypes.number,
  crsId: PropTypes.number,
  creAt: PropTypes.string,
  updAt: PropTypes.string
}
