import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setFlashStr, setCclStr} from 'components/layouts/axios/then_catch_funcs'

export const UsrList = ({onGenChange}) => {
  let usrList = null // return
  const [users, setUsers] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        onGenChange(Object.assign(setCclStr(error), setFlashStr(error.response.headers.flash)))
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

UsrList.propTypes = {
  onGenChange: PropTypes.func
}
