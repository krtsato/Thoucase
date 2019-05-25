import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/frgments/draftjs/frg_view/footbox/edit_btn'
import {DeleteBtn} from 'components/frgments/draftjs/frg_view/footbox/delete_btn'

export const Footbox = ({frgId, onGenChange}) => {
  return (
    <>
      <EditBtn frgId={frgId} />
      <DeleteBtn frgId={frgId} onGenChange={onGenChange} />
      {/* いいね機能 */}
    </>s
  )
}
Footbox.propTypes = {
  frgId: PropTypes.number,
  onGenChange: PropTypes.func
}
