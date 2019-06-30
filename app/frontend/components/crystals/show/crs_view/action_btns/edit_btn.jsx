import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {RedrContext} from 'components/layouts/app/context'

export const EditBtn = ({crystal}) => {
  const {setRedrPath} = useContext(RedrContext)

  /* crystal 編集 */
  const onEditClick = () => {
    setRedrPath(<Redirect to={{pathname: `/crystals/${crystal.crsId}/edit`, state: crystal}} />)
  }

  return (
    <button type='button' onClick={onEditClick}>
      編集
    </button>
  )
}

EditBtn.propTypes = {
  crystal: PropTypes.object
}
