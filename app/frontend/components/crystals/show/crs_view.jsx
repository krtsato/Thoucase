import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {CancelContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine} from 'components/layouts/axios/then_catch_funcs'
import {Namebox} from 'components/crystals/show/crs_view/namebox'
import {Headbox} from 'components/crystals/show/crs_view/headbox'
import {Actionbox} from 'components/crystals/show/crs_view/actionbox'
import {Frgbox} from 'components/crystals/show/crs_view/frgbox'

export const CrsView = ({initState}) => {
  const {setCclMsg} = useContext(CancelContext)
  const [crsVals, setCrsVals] = useState(initState)
  const [addNames, setAddNames] = useState({usrName: '', shwName: ''})
  const [fragments, setFragments] = useState([])
  const [isSelf, setIsSelf] = useState(false)

  /*
    from Link, Redirect : fragment 既存
    from URL            : fragment 取得
    common              : usrName, crsName, isSelf 取得 
  */
  const resDivider = (resData) => {
    if (resData.crystal) {
      // FrgView : editorState 復元, frgVals 更新
      const {
        id: crsId,
        name: crsName,
        user_id: usrId,
        showcase_id: shwId,
        created_at: creAt,
        updated_at: updAt
      } = resData.fragment
      setCrsVals({crsId, crsName, usrId, shwId, creAt, updAt})
    }
    const usrName = resData.usr_name
    const shwName = resData.shw_name
    setAddNames({usrName, shwName})
    setFragments(resData.fragments)
    setIsSelf(resData.is_self) // CrsView ~ Actionbox : isSelf 更新
  }

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get(`/crystals/${crsVals.crsId}`, {
        params: {user_id: crsVals.usrId, showcase_id: crsVals.shwId} // どちらか blank 考慮
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
      <Namebox crsName={crsVals.crsName} />
      <Headbox
        usrName={addNames.usrName}
        shwName={addNames.shwName}
        creAt={crsVals.creAt}
        updAt={crsVals.updAt}
      />
      <Actionbox isSelf={isSelf} crsVals={crsVals} />
      <Frgbox fragments={fragments} />
    </>
  )
}

CrsView.propTypes = {
  initState: PropTypes.object
}
