import React, {useState, useEffect, useContext} from 'react'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'
import {dateFormat} from 'components/layouts/date_format'

export const CrsList = () => {
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [crystals, setCrystals] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/crystals')
      .then((response) => {
        setCrystals(response.data)
      })
      .catch((error) => {
        setCclMsg(cancelLine(error))
        setFlashMsg(transFlash(error.response.headers.flash))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  /* crystals 一覧 */
  const crsList = (crsArray) => {
    if (crsArray === []) return null
    return (
      <ul>
        {crsArray.map((crystal) => (
          <li key={crystal.id}>
            <p>name : {crystal.name}</p>
            <p>user_id : {crystal.user_id}</p>
            <p>showcase_id : {crystal.showcase_id}</p>
            <p>created_at : {dateFormat(crystal.created_at)}</p>
            <p>updated_at : {dateFormat(crystal.updated_at)}</p>
          </li>
        ))}
      </ul>
    )
  }

  return crsList(crystals)
}
