import React from 'react'
import PropTypes from 'prop-types'
import {dateFormat} from 'components/layouts/date_format'

export const HeadInfo = ({usrName, creAt, updAt}) => (
  <aside className='crsHeadInfo'>
    <span>作成者 : {usrName}</span>
    <time>作成日 : {dateFormat(creAt)}</time>
    <time>更新日 : {dateFormat(updAt)}</time>
  </aside>
)
HeadInfo.propTypes = {
  usrName: PropTypes.string,
  creAt: PropTypes.string,
  updAt: PropTypes.string
}
