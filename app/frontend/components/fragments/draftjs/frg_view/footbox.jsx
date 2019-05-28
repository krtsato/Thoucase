import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/fragments/draftjs/frg_view/footbox/edit_btn'
import {DeleteBtn} from 'components/fragments/draftjs/frg_view/footbox/delete_btn'

export const Footbox = ({frgVals, onGenChange}) => {
  return (
    <>
      <EditBtn frgVals={frgVals} />
      <DeleteBtn frgId={frgVals.frgId} onGenChange={onGenChange} />
      {/* いいね機能 */}
    </>
  )
}
Footbox.propTypes = {
  frgVals: PropTypes.object,
  onGenChange: PropTypes.func
}
