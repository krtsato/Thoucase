import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setErrObj} from 'components/layouts/axios/then_catch_funcs'

export const CrsList = ({onGenChange}) => {
  let crsList = null // return
  const [crystals, setCrystals] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/crystals')
      .then((response) => {
        setCrystals(response.data)
      })
      .catch((error) => {
        onGenChange(setErrObj(error))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  /* crystals 一覧 */
  if (crystals) {
    crsList = (
      <ul>
        {crystals.map((crystal) => (
          <li key={crystal.id}>
            <p>showcase_id : {crystal.showcase_id}</p>
            <p>user_id : {crystal.user_id}</p>
            <p>created_at : {crystal.created_at}</p>
            <p>updated_at : {crystal.updated_at}</p>
            <p>name : {crystal.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  return crsList
}

CrsList.propTypes = {
  onGenChange: PropTypes.func
}
