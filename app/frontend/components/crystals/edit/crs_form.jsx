import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Namebox} from 'components/crystals/edit/crs_form/namebox'
import {ShwLink} from 'components/crystals/edit/crs_form/shw_link'
import {SaveBtn} from 'components/crystals/edit/crs_form/save_btn'

export const CrsForm = ({initState}) => {
  const [crsVals, setCrsVals] = useState(initState)

  const bufNameChange = (nextState) => {
    setCrsVals((unChanged) => ({...unChanged, crsName: nextState}))
  }

  const bufShwIdChange = (nextState) => {
    setCrsVals((unChanged) => ({...unChanged, shwId: nextState}))
  }

  return (
    <>
      <Namebox crsName={crsVals.crsName} bufNameChange={bufNameChange} />
      {/* 説明欄 */}
      <ShwLink shwId={crsVals.shwId} bufShwIdChange={bufShwIdChange} />
      <SaveBtn crsVals={crsVals} />
    </>
  )
}

CrsForm.propTypes = {
  initState: PropTypes.object
}
