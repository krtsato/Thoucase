import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/fragments/draftjs/frg_view/footbox/edit_btn'
import {DeleteBtn} from 'components/fragments/draftjs/frg_view/footbox/delete_btn'

export const Footbox = ({isSelf, frgVals, onGenChange}) => {
  let buttons = null // return

  // fragment 所有者は編集可能
  if (isSelf) {
    buttons = (
      <div className='frgFoot'>
        <EditBtn frgVals={frgVals} />
        <DeleteBtn frgId={frgVals.frgId} crsId={frgVals.crsId} onGenChange={onGenChange} />
        {/* いいね機能 */}
      </div>
    )
  }

  return buttons
}

Footbox.propTypes = {
  isSelf: PropTypes.bool,
  frgVals: PropTypes.object,
  onGenChange: PropTypes.func
}
