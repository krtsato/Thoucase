import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

export const EditBtn = ({frgVals}) => {
  const [redrPath, setRedrPath] = useState(null)

  /* フラグメント 編集 */
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
    <>
      {redrPath}
      <button type='button' onClick={onEditClick}>
        編集
      </button>
    </>
  )
}

EditBtn.propTypes = {
  frgVals: PropTypes.object
}
