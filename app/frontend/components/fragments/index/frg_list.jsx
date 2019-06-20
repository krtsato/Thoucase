import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {transFlash, cancelLine} from 'components/layouts/axios/then_catch_funcs'
import {dateFormat} from 'components/layouts/date_format'

export const FrgList = () => {
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
  const setUsrPart = (index) => (
    <p>
      <span>ICON</span>
      <span>{users[index].name}</span>
    </p>
  )

  /* 単位フラグメント */
  const setFrgPart = (frg) => (
    <Link
      to={{
        pathname: `/fragments/${frg.id}`,
        state: frg
      }}>
      <p>name : {frg.name}</p>
      <p>created_at : {dateFormat(frg.created_at)}</p>
    </Link>
  )

  /* fragments + users 一覧 */
  const frgList = (frgArray) => {
    if (fragments === []) return null
    return (
      <ul>
        {frgArray.map((fragment, index) => (
          <li key={fragment.id}>
            {setUsrPart(index)}
            {setFrgPart(fragment)}
          </li>
        ))}
      </ul>
    )
  }

  return frgList(fragments)
}
