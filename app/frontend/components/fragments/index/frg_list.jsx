import React, {useState, useEffect} from 'react'
import {axiosRails} from 'components/layouts/axios/instances'

export const FrgList = () => {
  let frgList = null
  const [fragments, setFragments] = useState([])

  /* ライフサイクル */
  useEffect(() => {
    axiosRails
      .get('/fragments')
      .then((response) => {
        console.log(response.data)
        setFragments(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  /* fragments 一覧 生成 */
  if (fragments) {
    frgList = (
      <ul>
        {fragments.map((fragment) => (
          <li key={fragment.id}>
            <p>id : {fragment.id}</p>
            <p>crystal_id : {fragment.crystal_id}</p>
            <p>user_id : {fragment.user_id}</p>
            <p>created_at : {fragment.created_at}</p>
            <p>updated_at : {fragment.updated_at}</p>
            <p>name : {fragment.name}</p>
            content : Display viewer here.
            {/* fragment.content */}
          </li>
        ))}
      </ul>
    )
  }

  return frgList
}
