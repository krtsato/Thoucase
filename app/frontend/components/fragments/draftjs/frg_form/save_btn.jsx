import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {convertToRaw} from 'draft-js'
import {Redirect} from 'react-router-dom'
import {RedrContext, FlashContext, InvldContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {validCheck} from 'components/layouts/axios/validate'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const SaveBtn = ({reqMethod, fragment}) => {
  const {frgId, frgName, crsId, editorState} = fragment
  const {setRedrPath} = useContext(RedrContext)
  const {setFlashMsg} = useContext(FlashContext)
  const {setInvldMsg} = useContext(InvldContext)

  /* fragment 作成, 更新 */
  const onSaveClick = () => {
    const rawFrg = convertToRaw(editorState.getCurrentContent())
    const check = validCheck({frgName, rawFrg, crsId})

    // post or patch
    const axiosBy = (method) => {
      if (method === 'post') {
        return axiosRails.post(`/crystals/${crsId}/fragments`, {
          fragment: {name: frgName, content: rawFrg}
        })
      }
      return axiosRails.patch(`/fragments/${frgId}`, {
        fragment: {name: frgName, content: rawFrg, crystal_id: crsId}
      })
    }

    // validation, axios
    if (check[0]) {
      setInvldMsg(check[1]) // validation エラーメッセージ
    } else {
      axiosBy(reqMethod)
        .then((response) => {
          setFlashMsg(transFlash(response.headers.flash))
          setRedrPath(
            <Redirect
              to={{
                pathname: `/fragments/${response.data.id}`,
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
  reqMethod: PropTypes.string,
  fragment: PropTypes.object
}
