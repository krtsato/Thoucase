import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setFlashStr, setCclStr} from 'components/layouts/axios/then_catch_funcs'

export const FrgList = ({onGenChange}) => {
  let frgList = null // return
  const [fragments, setFragments] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/fragments')
      .then((response) => {
        setFragments(response.data)
      })
      .catch((error) => {
        onGenChange(setCclStr(error))
        onGenChange(setFlashStr(error.response.headers.flash))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  /* fragments 一覧 */
  if (fragments) {
    frgList = (
      <ul>
        {fragments.map((fragment) => (
          <li key={fragment.id}>
            <p>crystal_id : {fragment.crystal_id}</p>
            <p>user_id : {fragment.user_id}</p>
            <p>created_at : {fragment.created_at}</p>
            <p>updated_at : {fragment.updated_at}</p>
            <p>name : {fragment.name}</p>
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
