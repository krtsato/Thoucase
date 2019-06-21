import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {RedrContext} from 'components/layouts/app/context'
import PropTypes from 'prop-types'

export const EditBtn = ({frgVals}) => {
  const {setRedrPath} = useContext(RedrContext)

  /* fragment 編集 */
  const onEditClick = (e) => {
    e.preventDefault()
    setRedrPath(
      <Redirect
        to={{
          pathname: `/fragments/${frgVals.frgId}/edit`,
          state: frgVals
        }}
      />
    ) // リダイレクト
  }

  return (
    <button type='button' onClick={onEditClick}>
      編集
    </button>
  )
}

EditBtn.propTypes = {
  frgVals: PropTypes.object
}
