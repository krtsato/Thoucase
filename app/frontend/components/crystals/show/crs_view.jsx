import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {CancelContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine} from 'components/layouts/axios/then_catch_funcs'
import {HeadInfo} from 'components/crystals/show/crs_view/head_info'
import {Actionbox} from 'components/crystals/show/crs_view/actionbox'
import {CrsFrg} from 'components/crystals/show/crs_view/crs_frg'

export const CrsView = ({initState}) => {
  const {setCclMsg} = useContext(CancelContext)
  const [crsVals, setCrsVals] = useState(initState)
  const [addNames, setAddNames] = useState({usrName: '', shwName: ''})
  const [fragments, setFragments] = useState([])
  const [isSelf, setIsSelf] = useState(false)

  /*
    from Link, Redirect except delete action    : crystal 既存
    from URL query or Redirect by delete action : crystal 取得
    common : usrName, shwName, fragments, isSelf 取得
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
      setCrsVals({crsId, crsName, usrId, shwId, creAt, updAt})
    }
    const usrName = resData.usr_name
    const shwName = resData.shw_name
    setAddNames({usrName, shwName}) // CrsView ~ HeadInfo : addNames 更新
    setFragments(resData.fragments) // CrsView ~ CrsFrg : fragments 更新
    setIsSelf(resData.is_self) // CrsView ~ Actionbox : isSelf 更新
  }

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get(`/crystals/${crsVals.crsId}`, {
        params: {user_id: crsVals.usrId, showcase_id: crsVals.shwId}
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
      <h1 className='crsName'>{crsVals.crsName}</h1>
      <HeadInfo
        usrName={addNames.usrName}
        shwName={addNames.shwName}
        creAt={crsVals.creAt}
        updAt={crsVals.updAt}
      />
      <Actionbox isSelf={isSelf} crsVals={crsVals} />
      <CrsFrg fragments={fragments} />
    </>
  )
}

CrsView.propTypes = {
  initState: PropTypes.object
}
