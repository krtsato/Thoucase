import React from 'react'
import PropTypes from 'prop-types'
import {ShwList} from 'components/showcases/index/shw_list'

export const ShwIndex = ({onGenChange}) => (
  <>
    <h2>showcases#index</h2>
    <ShwList onGenChange={onGenChange} />
  </>
)

ShwIndex.propTypes = {
  onGenChange: PropTypes.func
}
