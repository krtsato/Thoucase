import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {RedrContext, FlashContext, InvldContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {validCheck} from 'components/layouts/axios/validate'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const SaveBtn = ({showcase}) => {
  const {shwId, shwName} = showcase
  const {setRedrPath} = useContext(RedrContext)
  const {setFlashMsg} = useContext(FlashContext)
  const {setInvldMsg} = useContext(InvldContext)

  const onSaveClick = () => {
    const check = validCheck({shwName})

    // validation, axios
    if (check[0]) {
      setInvldMsg(check[1]) // validation エラーメッセージ
    } else {
      axiosRails
        .patch(`/showcases/${shwId}`, {
          showcase: {name: shwName}
        })
        .then((response) => {
          setFlashMsg(transFlash(response.headers.flash))
          setRedrPath(
            <Redirect
              to={{
                pathname: `/showcases/${response.data.id}`,
                state: response.data
              }}
            />
          ) // リダイレクト
        })
        .catch((error) => {
          setFlashMsg(transFlash(error.response.headers.flash))
        })
    }
  }

  return (
    <button type='button' onClick={onSaveClick}>
      保存
    </button>
  )
}

SaveBtn.propTypes = {
  showcase: PropTypes.object
}
