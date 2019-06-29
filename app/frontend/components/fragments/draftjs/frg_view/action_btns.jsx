import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/fragments/draftjs/frg_view/action_btns/edit_btn'
import {DeleteBtn} from 'components/fragments/draftjs/frg_view/action_btns/delete_btn'

export const ActionBtns = ({isSelf, fragment}) => {
  /* fragment 所有者は編集可能 */
  const buttons = (selfBool, frg) => {
    if (!selfBool) return null
    return (
      <div className='frgAction'>
        <EditBtn fragment={frg} />
        <DeleteBtn frgId={frg.frgId} crsId={frg.crsId} />
        {/* いいね機能 */}
      </div>
    )
  }

  return buttons(isSelf, fragment)
}

ActionBtns.propTypes = {
  isSelf: PropTypes.bool,
  fragment: PropTypes.object
}
