import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/showcases/show/shw_view/action_btns/edit_btn'
import {DeleteBtn} from 'components/showcases/show/shw_view/action_btns/delete_btn'

export const ActionBtns = ({isSelf, showcase}) => {
  /* showcase 所有者は編集・削除可能 */
  const actionBtns = (selfBool) => {
    if (!selfBool) return null
    return (
      <div className='shwAction'>
        <EditBtn showcase={showcase} />
        <DeleteBtn shwId={showcase.shwId} usrId={showcase.usrId} />
        {/* いいね機能 */}
      </div>
    )
  }

  return actionBtns(isSelf)
}

ActionBtns.propTypes = {
  isSelf: PropTypes.bool,
  showcase: PropTypes.object
}
