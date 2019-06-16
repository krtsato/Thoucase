import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {CancelContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine} from 'components/layouts/axios/then_catch_funcs'
import {UsrInfo} from 'components/users/show/usr_page/usr_info'
import {UsrTab} from 'components/users/show/usr_page/usr_tab'
import {UsrCrs} from 'components/users/show/usr_page/usr_crs'
import {UsrFrg} from 'components/users/show/usr_page/usr_frg'

export const UsrPage = ({usrId}) => {
  let activeComp = null
  const {setCclMsg} = useContext(CancelContext)
  const [activeFlag, setActiveFlag] = useState('crs')
  const [usrVals, setUsrVals] = useState(null)
  const [crsVals, setCrsVals] = useState(null)
  const [frgVals, setFrgVals] = useState(null)

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get(`/users/${usrId}`)
      .then((response) => {
        setUsrVals(response.data.user)
        setCrsVals(response.data.crystals)
        setFrgVals(response.data.fragments)
      })
      .catch((error) => {
        setCclMsg(cancelLine(error))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  /* on activeFlag change */
  useEffect(() => {
    switch (activeFlag) {
      case 'crs':
        activeComp = <UsrCrs crsVals={crsVals} />
        break
      case 'frg':
        activeComp = <UsrFrg frgVals={frgVals} />
        break
      default:
        break // いいね機能実装予定
    }
  }, [activeFlag])

  return (
    <>
      <UsrInfo usrVals={usrVals} />
      <UsrTab setActiveFlag={setActiveFlag} />
      {activeComp}
    </>
  )
}

UsrPage.propTypes = {
  usrId: PropTypes.number
}
