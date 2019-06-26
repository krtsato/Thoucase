import React from 'react'
import PropTypes from 'prop-types'
import {dateFormat} from 'components/layouts/date_format'

export const HeadInfo = ({usrName, crsName, creAt, updAt}) => {
  return (
    <aside className='frgHeadInfo'>
      <span>作成者 : {usrName}</span>
      <span>クリスタル : {crsName}</span>
      <time>作成日 : {dateFormat(creAt)}</time>
      <time>更新日 : {dateFormat(updAt)}</time>
    </aside>
  )
}
HeadInfo.propTypes = {
  usrName: PropTypes.string,
  crsName: PropTypes.string,
  creAt: PropTypes.string,
  updAt: PropTypes.string
}
