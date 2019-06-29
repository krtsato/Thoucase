import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {RedrContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const DeleteBtn = ({shwId, usrId}) => {
  const {setRedrPath} = useContext(RedrContext)
  const {setFlashMsg} = useContext(FlashContext)

  /* showcase 削除 */
  const onDeleteClick = () => {
    axiosRails
      .delete(`/showcase/${shwId}`)
      .then((response) => {
        setFlashMsg(transFlash(response.headers.flash))
        setRedrPath(<Redirect to={`/users/${usrId}`} />) // リダイレクト
      })
      .catch((error) => {
        setFlashMsg(transFlash(error.response.headers.flash))
      })
  }

  return (
    <button type='button' onClick={onDeleteClick}>
      削除
    </button>
  )
}

DeleteBtn.propTypes = {
  shwId: PropTypes.number,
  usrId: PropTypes.number
}
