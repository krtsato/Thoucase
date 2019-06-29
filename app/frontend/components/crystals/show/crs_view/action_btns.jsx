import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/crystals/show/crs_view/action_btns/edit_btn'
import {DeleteBtn} from 'components/crystals/show/crs_view/action_btns/delete_btn'

export const ActionBtns = ({isSelf, crystal}) => {
  /* crystal 所有者は編集・削除可能 */
  const actionBtns = (selfBool, crs) => {
    if (!selfBool) return null
    return (
      <div className='crsAction'>
        <EditBtn crystal={crs} />
        <DeleteBtn crsId={crs.crsId} usrId={crs.usrId} />
        {/* いいね機能 */}
      </div>
    )
  }

  return actionBtns(isSelf, crystal)
}

ActionBtns.propTypes = {
  isSelf: PropTypes.bool,
  crystal: PropTypes.object
}
