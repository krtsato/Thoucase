import React, {useState, useEffect} from 'react'
import {axiosRails} from 'components/axios/instances'

export const Hoge = () => {
  let fragmentsList = null
  const [fragments, setFragments] = useState([])

  /* ライフサイクル */
  useEffect(() => {
    axiosRails({
      method: 'get',
      url: '/fragments/index.json'
    })
      .then((response) => {
        console.log(response.data)
        setFragments(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const onClick = () => {
    axiosRails({
      method: 'get',
      url: '/fragments/index.json',
      responseType: 'json'
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /* メディアURLインプット 生成 */
  if (fragments) {
    fragmentsList = (
      <button type='button' onClick={onClick}>
        Please JSON
      </button>
      /*
      <ul>
        {fragments.map((fragment) => (
          <li key={fragment.id}>
            <p>id : {fragment.id}</p>
            <p>name : {fragment.name}</p>
            <p>content :</p>
            <pre>{fragment.content}</pre>
          </li>
        ))}
      </ul>
      */
    )
  }

  /* レンダリング */
  return (
    <>
      <h1>Hoge</h1>
      {fragmentsList}
    </>
  )
}
