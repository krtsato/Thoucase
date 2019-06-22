import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/fragments/draftjs/frg_view/actionbox/edit_btn'
import {DeleteBtn} from 'components/fragments/draftjs/frg_view/actionbox/delete_btn'

export const Actionbox = ({isSelf, frgVals}) => {
  /* fragment 所有者は編集可能 */
  const buttons = () => {
    if (!isSelf) return null
    return (
      <div className='frgAction'>
        <EditBtn frgVals={frgVals} />
        <DeleteBtn frgId={frgVals.frgId} crsId={frgVals.crsId} />
        {/* いいね機能 */}
      </div>
    )
  }

  return buttons()
}

Actionbox.propTypes = {
  isSelf: PropTypes.bool,
  frgVals: PropTypes.object
}
