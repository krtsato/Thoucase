import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/fragments/draftjs/frg_view/footbox/edit_btn'
import {DeleteBtn} from 'components/fragments/draftjs/frg_view/footbox/delete_btn'

export const Actionbox = ({isSelf, frgVals}) => {
  /* fragment 所有者は編集可能 */
  const buttons = (selfBool, frg) => {
    if (!selfBool) return null
    return (
      <div className='frgAction'>
        <EditBtn frgVals={frg} />
        <DeleteBtn frgId={frg.frgId} crsId={frg.crsId} />
        {/* いいね機能 */}
      </div>
    )
  }

  return buttons(isSelf, frgVals)
}

Actionbox.propTypes = {
  isSelf: PropTypes.bool,
  frgVals: PropTypes.object
}
