import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {RedrContext} from 'components/layouts/app/context'
import PropTypes from 'prop-types'

export const EditBtn = ({crsVals}) => {
  const {setRedrPath} = useContext(RedrContext)

  /* crystal 編集 */
  const onEditClick = () => {
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
    <button type='button' onClick={onEditClick}>
      編集
    </button>
  )
}

EditBtn.propTypes = {
  crsVals: PropTypes.object
}
