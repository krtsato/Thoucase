import React, {useState, useEffect, useContext} from 'react'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'
import {dateFormat} from 'components/layouts/date_format'

export const ShwList = () => {
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [showcases, setShowcases] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/showcases')
      .then((response) => {
        setShowcases(response.data)
      })
      .catch((error) => {
        setCclMsg(cancelLine(error))
        setFlashMsg(transFlash(error.response.headers.flash))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  /* showcases 一覧 */
  const shwList = (shwArray) => {
    if (shwArray === []) return null
    return (
      <ul>
        {shwArray.map((showcase) => (
          <li key={showcase.id}>
            <p>name : {showcase.name}</p>
            <p>user_id : {showcase.user_id}</p>
            <p>created_at : {dateFormat(showcase.created_at)}</p>
            <p>updated_at : {dateFormat(showcase.updated_at)}</p>
          </li>
        ))}
      </ul>
    )
  }

  return shwList(showcases)
}
