import React from 'react'
import PropTypes from 'prop-types'
import {dateFormat} from 'components/layouts/date_format'

export const Headbox = ({usrName, crsName, creAt, updAt}) => {
  return (
    <aside className='frgHead'>
      <span>作成者 : {usrName}</span>
      <span>クリスタル : {crsName}</span>
      <time>作成日 : {dateFormat(creAt)}</time>
      <time>更新日 : {dateFormat(updAt)}</time>
    </aside>
  )
}
Headbox.propTypes = {
  usrName: PropTypes.string,
  crsName: PropTypes.string,
  creAt: PropTypes.string,
  updAt: PropTypes.string
}
