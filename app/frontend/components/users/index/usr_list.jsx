import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'
import {dateFormat} from 'components/layouts/date_format'

export const UsrList = () => {
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
  const usrList = (usrArray) => {
    if (usrArray === []) return null
    return (
      <ul>
        {usrArray.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              <p>name : {user.name}</p>
              <p>created_at : {dateFormat(user.created_at)}</p>
              <p>updated_at : {dateFormat(user.updated_at)}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return usrList(users)
}
