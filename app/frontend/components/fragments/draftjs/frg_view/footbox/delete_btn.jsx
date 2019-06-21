import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {RedrContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const DeleteBtn = ({frgId, crsId}) => {
  const {setRedrPath} = useContext(RedrContext)
  const {setFlashMsg} = useContext(FlashContext)

  /* fragment 削除 */
  const onDeleteClick = (e) => {
    e.preventDefault()
    axiosRails
      .delete(`/fragments/${frgId}`)
      .then((response) => {
        setFlashMsg(transFlash(response.headers.flash))
        setRedrPath(<Redirect to={`/crystals/${crsId}`} />) // リダイレクト
      })
      .catch((error) => {
        setFlashMsg(transFlash(error.response.headers.flash))
      })
  }

  return (
    <>
      <button type='button' onClick={onDeleteClick}>
        削除
      </button>
    </>
  )
}

DeleteBtn.propTypes = {
  frgId: PropTypes.number,
  crsId: PropTypes.number
}
