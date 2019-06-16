import React from 'react'
import PropTypes from 'prop-types'
import {UsrPage} from 'components/users/show/usr_page'

export const UsrShow = ({match}) => {
  const usrId = parseInt(match.params.id, 10)

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
