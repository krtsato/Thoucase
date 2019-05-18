import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {axiosRails, canceller} from 'components/layouts/axios/instances'
import {setErrObj} from 'components/layouts/axios/then_catch_funcs'

export const ShwList = ({onGenChange}) => {
  let shwList = null // return
  const [showcases, setShowcases] = useState([])

  /* didMount, willUnMount */
  useEffect(() => {
    axiosRails
      .get('/showcases')
      .then((response) => {
        setShowcases(response.data)
      })
      .catch((error) => {
        onGenChange(setErrObj(error))
      })
    return () => {
      canceller.cancel
    }
  }, [])

  /* showcases 一覧 */
  if (showcases) {
    shwList = (
      <ul>
        {showcases.map((showcase) => (
          <li key={showcase.id}>
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

ShwList.propTypes = {
  onGenChange: PropTypes.func
}
