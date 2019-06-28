import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'
import {dateFormat} from 'components/layouts/date_format'

export const CrsList = () => {
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [crystals, setCrystals] = useState([])
  const [users, setUsers] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/crystals')
      .then((response) => {
        setUsers(response.data.users)
        setCrystals(response.data.crystals)
      })
      .catch((error) => {
        setCclMsg(cancelLine(error))
        setFlashMsg(transFlash(error.response.headers.flash))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  /* 単位ユーザ */
  const setUsrPart = (index) => (
    <p>
      <span>ICON</span>
      <span>{users[index].name}</span>
    </p>
  )

  /* 単位クリスタル */
  const setCrsPart = (crs) => (
    <Link
      to={{
        pathname: `/crystals/${crs.id}`,
        state: crs
      }}>
      <p>name : {crs.name}</p>
      <p>created_at : {dateFormat(crs.created_at)}</p>
    </Link>
  )
  /* crystals 一覧 */
  const crsList = (crsArray) => {
    if (crsArray === []) return null
    return (
      <ul>
        {crsArray.map((crystal, index) => (
          <li key={crystal.id}>
            {setUsrPart(index)}
            {setCrsPart(crystal)}
          </li>
        ))}
      </ul>
    )
  }

  return crsList(crystals)
}
