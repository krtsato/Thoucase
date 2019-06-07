import React from 'react'
import PropTypes from 'prop-types'
import {EditBtn} from 'components/fragments/draftjs/frg_view/footbox/edit_btn'
import {DeleteBtn} from 'components/fragments/draftjs/frg_view/footbox/delete_btn'

export const Footbox = ({frgVals, onGenChange}) => (
  <div className='frgFoot'>
    <EditBtn frgVals={frgVals} />
    <DeleteBtn frgId={frgVals.frgId} crsId={frgVals.crsId} onGenChange={onGenChange} />
    {/* いいね機能 */}
  </div>
)

Footbox.propTypes = {
  frgVals: PropTypes.object,
  onGenChange: PropTypes.func
}
