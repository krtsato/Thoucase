import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {RedrContext} from 'components/layouts/app/context'

export const EditBtn = ({fragment}) => {
  const {setRedrPath} = useContext(RedrContext)

  /* fragment 編集 */
  const onEditClick = () => {
    setRedrPath(<Redirect to={{pathname: `/fragments/${fragment.frgId}/edit`, state: fragment}} />)
  }

  return (
    <button type='button' onClick={onEditClick}>
      編集
    </button>
  )
}

EditBtn.propTypes = {
  fragment: PropTypes.object
}
