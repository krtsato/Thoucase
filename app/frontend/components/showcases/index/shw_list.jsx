import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {CancelContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {cancelLine, transFlash} from 'components/layouts/axios/then_catch_funcs'
import {dateFormat} from 'components/layouts/date_format'

export const ShwList = () => {
  const {setCclMsg} = useContext(CancelContext)
  const {setFlashMsg} = useContext(FlashContext)
  const [showcases, setShowcases] = useState([])
  const [users, setUsers] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/showcases')
      .then((response) => {
        setUsers(response.data.users)
        setShowcases(response.data.showcases)
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
  const setUsrPart = (usrs, index) => (
    <p>
      <span>ここにユーザアイコンを表示する | </span>
      <span>{usrs[index].name}</span>
    </p>
  )

  /* 単位ショーケース */
  const setShwPart = (shw) => (
    <Link
      to={{
        pathname: `/showcases/${shw.id}`,
        state: shw
      }}>
      <p>name : {shw.name}</p>
      <p>created_at : {dateFormat(shw.created_at)}</p>
    </Link>
  )

  /* showcases 一覧 */
  const shwList = (usrArray, shwArray) => {
    if (shwArray === []) return null
    return (
      <ul>
        {shwArray.map((showcase, index) => (
          <li key={showcase.id}>
            {setUsrPart(usrArray, index)}
            {setShwPart(showcase)}
          </li>
        ))}
      </ul>
    )
  }

  return shwList(users, showcases)
}
