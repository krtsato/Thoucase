import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {NameInput} from 'components/crystals/edit/crs_form/name_input'
import {ShwLink} from 'components/crystals/edit/crs_form/shw_link'
import {SaveBtn} from 'components/crystals/edit/crs_form/save_btn'

export const CrsForm = ({initState}) => {
  const [crsVals, setCrsVals] = useState(initState)

  return (
    <>
      <NameInput crsName={crsVals.crsName} setCrsVals={setCrsVals} />
      {/* 説明欄 */}
      <ShwLink shwId={crsVals.shwId} setCrsVals={setCrsVals} />
      <SaveBtn crsVals={crsVals} />
    </>
  )
}

CrsForm.propTypes = {
  initState: PropTypes.object
}
