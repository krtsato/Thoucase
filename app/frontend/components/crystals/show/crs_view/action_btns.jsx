import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/crystals/show/crs_view/action_btns/edit_btn'
import {DeleteBtn} from 'components/crystals/show/crs_view/action_btns/delete_btn'

export const ActionBtns = ({isSelf, crystal}) => {
  /* crystal 所有者は編集・削除可能 */
  const actionBtns = () => {
    if (!isSelf) return null
    return (
      <div className='crsAction'>
        <EditBtn crystal={crystal} />
        <DeleteBtn crsId={crystal.crsId} usrId={crystal.usrId} />
        {/* いいね機能 */}
      </div>
    )
  }

  return actionBtns()
}

ActionBtns.propTypes = {
  isSelf: PropTypes.bool,
  crystal: PropTypes.object
}
