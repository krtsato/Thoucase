import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

export const EditBtn = ({frgId}) => {
  const [redrPath, setRedrPath] = useState(null)

  const onEditClick = (e) => {
    const hoge = {}
    e.preventDefault()
    setRedrPath(
      <Redirect
        to={{
          pathname: `/fragments/${frgId}/edit`,
          state: hoge
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
  frgId: PropTypes.number
}
