import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {CancelContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine} from 'components/layouts/axios/then_catch_funcs'
import {HeadInfo} from 'components/crystals/show/crs_view/head_info'
import {ActionBtns} from 'components/crystals/show/crs_view/action_btns'
import {CrsFrg} from 'components/crystals/show/crs_view/crs_frg'

export const CrsView = ({initState}) => {
  const {setCclMsg} = useContext(CancelContext)
  const [crystal, setCrystal] = useState(initState)
  const [fragments, setFragments] = useState([])
  const [user, setUser] = useState({})
  const [showcase, setShowcase] = useState({})
  const [isSelf, setIsSelf] = useState(false)

  /*
    from Link, Redirect except delete action    : crystal 既存
    from URL query or Redirect by delete action : crystal 取得
    common : user, showcase, fragments, isSelf 取得
  */
  const resDivider = (resData) => {
    if (resData.crystal) {
      const {
        id: crsId,
        name: crsName,
        user_id: usrId,
        showcase_id: shwId,
        created_at: creAt,
        updated_at: updAt
      } = resData.crystal
      setCrystal({crsId, crsName, usrId, shwId, creAt, updAt})
    }
    setUser(resData.user) // CrsView ~ HeadInfo : user 更新
    setShowcase(resData.showcase) // CrsView ~ HeadInfo : showcase 更新
    setFragments(resData.fragments) // CrsView ~ CrsFrg : fragments 更新
    setIsSelf(resData.is_self) // CrsView ~ ActionBtns : isSelf 更新
  }

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get(`/crystals/${crystal.crsId}`, {
        params: {user_id: crystal.usrId, showcase_id: crystal.shwId}
      })
      .then((response) => {
        resDivider(response.data)
      })
      .catch((error) => {
        setCclMsg(cancelLine(error))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  return (
    <>
      <h1 className='crsName'>{crystal.crsName}</h1>
      <HeadInfo user={user} showcase={showcase} creAt={crystal.creAt} updAt={crystal.updAt} />
      <ActionBtns isSelf={isSelf} crystal={crystal} />
      <CrsFrg fragments={fragments} />
    </>
  )
}

CrsView.propTypes = {
  initState: PropTypes.object
}
