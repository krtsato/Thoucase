import React, {useState, useEffect} from 'react'
import {axiosRails} from 'components/layouts/axios/instances'

export const UsrList = () => {
  let usrList = null
  const [users, setUsers] = useState([])

  /* ライフサイクル */
  useEffect(() => {
    axiosRails
      .get('/users')
      .then((response) => {
        console.log(response.data)
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  /* users 一覧 生成 */
  if (users) {
    usrList = (
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>id : {user.id}</p>
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
