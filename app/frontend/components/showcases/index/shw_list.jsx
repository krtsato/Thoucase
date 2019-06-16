import React, {useState, useEffect, useContext} from 'react'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'

export const ShwList = () => {
  let shwList = null // return
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
  if (showcases) {
    shwList = (
      <ul>
        {showcases.map((showcase) => (
          <li key={showcase.id}>
            <p>user_id : {showcase.user_id}</p>
            <p>created_at : {showcase.created_at}</p>
            <p>updated_at : {showcase.updated_at}</p>
            <p>name : {showcase.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  return shwList
}
