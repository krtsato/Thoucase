import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {NameInput} from 'components/crystals/edit/crs_form/name_input'
import {ShwLink} from 'components/crystals/edit/crs_form/shw_link'
import {SaveBtn} from 'components/crystals/edit/crs_form/save_btn'

export const CrsForm = ({initState}) => {
  const [crystal, setCrystal] = useState(initState)

  return (
    <>
      <NameInput crsName={crystal.crsName} setCrystal={setCrystal} />
      {/* 説明欄 */}
      <ShwLink shwId={crystal.shwId} setCrystal={setCrystal} />
      <SaveBtn crystal={crystal} />
    </>
  )
}

CrsForm.propTypes = {
  initState: PropTypes.object
}
