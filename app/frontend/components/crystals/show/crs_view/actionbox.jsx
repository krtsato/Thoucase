import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/crystals/show/crs_view/actionbox/edit_btn'
import {DeleteBtn} from 'components/crystals/show/crs_view/actionbox/delete_btn'

export const Actionbox = ({isSelf, crsVals}) => {
  /* crystal 所有者は編集・削除可能 */
  const actionBtns = (selfBool) => {
    if (!selfBool) return null
    return (
      <div className='crsAction'>
        <EditBtn crsVals={crsVals} />
        <DeleteBtn crsId={crsVals.crsId} usrId={crsVals.usrId} />
        {/* いいね機能 */}
      </div>
    )
  }

  return actionBtns(isSelf)
}

Actionbox.propTypes = {
  isSelf: PropTypes.bool,
  crsVals: PropTypes.object
}
