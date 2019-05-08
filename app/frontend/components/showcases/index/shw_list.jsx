import React, {useState, useEffect} from 'react'
import {axiosRails} from 'components/layouts/axios/instances'

export const ShwList = () => {
  let shwList = null
  const [showcases, setShowcases] = useState([])

  /* ライフサイクル */
  useEffect(() => {
    axiosRails
      .get('/showcases')
      .then((response) => {
        console.log(response.data)
        setShowcases(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  /* showcases 一覧 生成 */
  if (showcases) {
    shwList = (
      <ul>
        {showcases.map((showcase) => (
          <li key={showcase.id}>
            <p>id : {showcase.id}</p>
            <p>user_id : {showcase.user_id}</p>
            <p>created_at : {showcase.created_at}</p>
            <p>updated_at : {showcase.updated_at}</p>
            <p>name : {showcase.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  return shwList
}
