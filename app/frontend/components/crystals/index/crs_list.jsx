import React, {useState, useEffect} from 'react'
import {axiosRails} from 'components/layouts/axios/instances'

export const CrsList = () => {
  let crsList = null
  const [crystals, setCrystals] = useState([])

  /* ライフサイクル */
  useEffect(() => {
    axiosRails
      .get('/crystals')
      .then((response) => {
        console.log(response.data)
        setCrystals(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  /* crystals 一覧 生成 */
  if (crystals) {
    crsList = (
      <ul>
        {crystals.map((crystal) => (
          <li key={crystal.id}>
            <p>id : {crystal.id}</p>
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
