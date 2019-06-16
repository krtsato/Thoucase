import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import {convertToRaw} from 'draft-js'
import {Redirect} from 'react-router-dom'
import {FlashContext, InvldContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {validCheck} from 'components/layouts/axios/validate'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const Footbox = ({reqMethod, frgId, frgName, crsId, editorState}) => {
  /* fragment 作成, 更新 */
  const {setFlashMsg} = useContext(FlashContext)
  const {setInvldMsg} = useContext(InvldContext)
  const [redrPath, setRedrPath] = useState(null)

  // start save process
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
    <div className='frgFoot'>
      {redrPath}
      <button type='button' onClick={onSaveClick}>
        保存
      </button>
    </div>
  )
}

Footbox.propTypes = {
  reqMethod: PropTypes.string,
  frgId: PropTypes.number,
  frgName: PropTypes.string,
  crsId: PropTypes.number,
  editorState: PropTypes.object
}
