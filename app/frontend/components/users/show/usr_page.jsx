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
  const {setCclMsg} = useContext(CancelContext)
  const [user, setUser] = useState({})
  const [crystals, setCrystals] = useState([])
  const [fragments, setFragments] = useState([])
  const [showcases, setShowcases] = useState([])
  const [activeFlag, setActiveFlag] = useState('crs')

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get(`/users/${usrId}`)
      .then((response) => {
        const resData = response.data
        setUser(resData.user)
        setCrystals(resData.crystals)
        setFragments(resData.fragments)
        setShowcases(resData.showcases)
      })
      .catch((error) => {
        setCclMsg(cancelLine(error))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  const ActiveComp = ({active}) => {
    ActiveComp.propTypes = {
      active: PropTypes.string
    }
    switch (active) {
      case 'crs':
        return <UsrCrs crystals={crystals} showcases={showcases} />
      case 'frg':
        return <UsrFrg fragments={fragments} />
      default:
        return null // いいね機能
    }
  }

  return (
    <>
      <UsrInfo user={user} />
      <UsrTab setActiveFlag={setActiveFlag} />
      <ActiveComp active={activeFlag} />
    </>
  )
}

UsrPage.propTypes = {
  usrId: PropTypes.number
}
