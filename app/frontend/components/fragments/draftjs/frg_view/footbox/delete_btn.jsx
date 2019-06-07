import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {setFlashStr} from 'components/layouts/axios/then_catch_funcs'

export const DeleteBtn = ({frgId, crsId, onGenChange}) => {
  const [redrPath, setRedrPath] = useState(null)

  /* fragment 削除 */
  const onDeleteClick = (e) => {
    e.preventDefault()
    axiosRails
      .delete(`/fragments/${frgId}`)
      .then((response) => {
        onGenChange(setFlashStr(response.headers.flash))
        setRedrPath(<Redirect to={`/crystals/${crsId}`} />)
        // リダイレクト
      })
      .catch((error) => {
        onGenChange(setFlashStr(error.response.headers.flash))
      })
  }

  return (
    <>
      {redrPath}
      <button type='button' onClick={onDeleteClick}>
        削除
      </button>
    </>
  )
}

DeleteBtn.propTypes = {
  frgId: PropTypes.number,
  crsId: PropTypes.number,
  onGenChange: PropTypes.func
}
