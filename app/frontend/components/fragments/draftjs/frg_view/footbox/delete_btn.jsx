import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {FlashContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const DeleteBtn = ({frgId, crsId}) => {
  const {setFlashMsg} = useContext(FlashContext)
  const [redrPath, setRedrPath] = useState(null)

  /* fragment 削除 */
  const onDeleteClick = (e) => {
    e.preventDefault()
    axiosRails
      .delete(`/fragments/${frgId}`)
      .then((response) => {
        setFlashMsg(transFlash(response.headers.flash))
        setRedrPath(<Redirect to={`/crystals/${crsId}`} />)
        // リダイレクト
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
  frgId: PropTypes.number,
  crsId: PropTypes.number
}
