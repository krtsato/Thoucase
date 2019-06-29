import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/fragments/draftjs/frg_view/action_btns/edit_btn'
import {DeleteBtn} from 'components/fragments/draftjs/frg_view/action_btns/delete_btn'

export const ActionBtns = ({isSelf, frgVals}) => {
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

ActionBtns.propTypes = {
  isSelf: PropTypes.bool,
  frgVals: PropTypes.object
}
