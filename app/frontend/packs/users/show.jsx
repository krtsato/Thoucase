import React from 'react'
import PropTypes from 'prop-types'
import {UsrPage} from 'components/users/show/usr_page'

export const UsrShow = ({match}) => {
  const usrId = match.params.id

  return (
    <>
      <h2>users#show</h2>
      <UsrPage usrId={usrId} />
    </>
  )
}

UsrShow.propTypes = {
  match: PropTypes.object
}
