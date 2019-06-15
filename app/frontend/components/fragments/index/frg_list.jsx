import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {transFlash, cancelLine} from 'components/layouts/axios/then_catch_funcs'

export const FrgList = () => {
  let frgList = null // return
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [fragments, setFragments] = useState([])
  const [users, setUsers] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/fragments')
      .then((response) => {
        setUsers(response.data.users)
        setFragments(response.data.fragments)
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
  const setUsrPart = (index) => {
    if (users !== []) {
      return (
        <p>
          <span>ICON</span>
          <span>{users[index].name}</span>
        </p>
      )
    }
    return null
  }

  /* 単位フラグメント */
  const setFrgPart = (frg) => {
    return (
      <Link
        to={{
          pathname: `/fragments/${frg.id}`,
          state: frg
        }}>
        <p>name : {frg.name}</p>
        <p>created_at : {frg.created_at}</p>
      </Link>
    )
  }

  /* fragments + users 一覧 */
  if (fragments !== []) {
    frgList = (
      <ul>
        {fragments.map((fragment, index) => (
          <li key={fragment.id}>
            {setUsrPart(index)}
            {setFrgPart(fragment)}
          </li>
        ))}
      </ul>
    )
  }

  return frgList
}
