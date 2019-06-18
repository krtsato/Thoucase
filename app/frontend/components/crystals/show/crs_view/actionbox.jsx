import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/crystals/show/crs_view/actionbox/edit_btn'
import {DeleteBtn} from 'components/crystals/show/crs_view/actionbox/delete_btn'

export const Actionbox = ({isSelf, crsVals}) => {
  let buttons = null // return

  // crystal 所有者は編集可能
  if (isSelf) {
    buttons = (
      <div className='crsFoot'>
        <EditBtn crsVals={crsVals} />
        <DeleteBtn crsId={crsVals.crsId} usrId={crsVals.usrId} />
        {/* いいね機能 */}
      </div>
    )
  }

  return buttons
}

Actionbox.propTypes = {
  isSelf: PropTypes.bool,
  crsVals: PropTypes.object
}
