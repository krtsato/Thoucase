import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {CancelContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine} from 'components/layouts/axios/then_catch_funcs'
import {HeadInfo} from 'components/showcases/show/shw_view/head_info'
import {ActionBtns} from 'components/showcases/show/shw_view/action_btns'
import {ShwCrs} from 'components/showcases/show/shw_view/shw_crs'

export const ShwView = ({initState}) => {
  const {setCclMsg} = useContext(CancelContext)
  const [showcase, setShowcase] = useState(initState)
  const [usrName, setUsrName] = useState('')
  const [crystals, setCrystals] = useState([])
  const [isSelf, setIsSelf] = useState(false)

  /*
    from Link, Redirect except delete action    : showcase 既存
    from URL query or Redirect by delete action : showcase 取得
    common : usrName, crystals, isSelf 取得
  */
  const resDivider = (resData) => {
    if (resData.showcase) {
      const {
        id: shwId,
        name: shwName,
        user_id: usrId,
        created_at: creAt,
        updated_at: updAt
      } = resData.showcase
      setShowcase({shwId, shwName, usrId, creAt, updAt})
    }
    setUsrName(resData.usr_name) // ShwView ~ HeadInfo : usrName 更新
    setCrystals(resData.crystals) // ShwView ~ ShwCrs : crystals 更新
    setIsSelf(resData.is_self) // ShwView ~ ActionBtns : isSelf 更新
  }

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get(`/showcases/${showcase.shwId}`, {
        params: {user_id: showcase.usrId}
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
      <h1 className='shwName'>{showcase.shwName}</h1>
      <HeadInfo usrName={usrName} creAt={showcase.creAt} updAt={showcase.updAt} />
      <ActionBtns isSelf={isSelf} showcase={showcase} />
      <ShwCrs crystals={crystals} />
    </>
  )
}

ShwView.propTypes = {
  initState: PropTypes.object
}
