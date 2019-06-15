import React, {useState, useEffect, useContext} from 'react'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'

export const UsrList = () => {
  let usrList = null // return
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [users, setUsers] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        setCclMsg(cancelLine(error))
        setFlashMsg(transFlash(error.response.headers.flash))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  /* users 一覧 生成 */
  if (users) {
    usrList = (
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>name : {user.name}</p>
            <p>created_at : {user.created_at}</p>
            <p>updated_at : {user.updated_at}</p>
          </li>
        ))}
      </ul>
    )
  }

  return usrList
}
