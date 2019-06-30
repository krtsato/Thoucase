import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {NameInput} from 'components/showcases/edit/shw_form/name_input'
import {SaveBtn} from 'components/showcases/edit/shw_form/save_btn'

export const ShwForm = ({initState}) => {
  const [showcase, setShowcase] = useState(initState)
  return (
    <>
      <NameInput shwName={showcase.shwName} setShowcase={setShowcase} />
      {/* 説明欄 */}
      <SaveBtn showcase={showcase} />
    </>
  )
}

ShwForm.propTypes = {
  initState: PropTypes.object
}
