import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

export const EditBtn = ({crsVals}) => {
  const [redrPath, setRedrPath] = useState(null)

  /* crystal 編集 */
  const onEditClick = (e) => {
    e.preventDefault()
    setRedrPath(
      <Redirect
        to={{
          pathname: `/crystals/${crsVals.crsId}/edit`,
          state: crsVals
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
  crsVals: PropTypes.object
}
