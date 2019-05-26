import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setFlashStr, setCclStr} from 'components/layouts/axios/then_catch_funcs'

export const FrgList = ({onGenChange}) => {
  let frgList = null // return
  const [fragments, setFragments] = useState([])
  const [users, setUsers] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/fragments')
      .then((response) => {
        console.log(JSON.stringify(response, undefined, 2))
        setUsers(response.data.users)
        setFragments(response.data.fragments)
      })
      .catch((error) => {
        onGenChange(Object.assign(setCclStr(error), setFlashStr(error.response.headers.flash)))
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

FrgList.propTypes = {
  onGenChange: PropTypes.func
}
