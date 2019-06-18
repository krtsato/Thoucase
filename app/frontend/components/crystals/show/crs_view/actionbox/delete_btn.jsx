import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {FlashContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const DeleteBtn = ({crsId, usrId}) => {
  const {setFlashMsg} = useContext(FlashContext)
  const [redrPath, setRedrPath] = useState(null)

  /* crystal 削除 */
  const onDeleteClick = (e) => {
    e.preventDefault()
    axiosRails
      .delete(`/crystals/${crsId}`)
      .then((response) => {
        setFlashMsg(transFlash(response.headers.flash))
        setRedrPath(<Redirect to={`/users/${usrId}`} />) // リダイレクト
      })
      .catch((error) => {
        setFlashMsg(transFlash(error.response.headers.flash))
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
  crsId: PropTypes.number,
  usrId: PropTypes.number
}
