import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export const UsrFrg = ({fragments}) => (
  <ul>
    {fragments.map((fragment) => (
      <li key={fragment.id}>
        <Link
          to={{
            pathname: `/fragments/${fragment.id}`,
            state: fragment
          }}>
          <p>name : {fragment.name}</p>
          <p>crystal_id : {fragment.crystal_id}</p>
          <p>created_at : {fragment.created_at}</p>
          <p>updated_at : {fragment.updated_at}</p>
        </Link>
      </li>
    ))}
  </ul>
)

UsrFrg.propTypes = {
  fragments: PropTypes.array
}
