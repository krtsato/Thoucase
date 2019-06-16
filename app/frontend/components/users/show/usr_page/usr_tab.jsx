import React from 'react'
import PropTypes from 'prop-types'

export const UsrTab = ({setActiveFlag}) => {
  const onCrsTabClick = () => {
    setActiveFlag('crs')
  }
  const onFrgTabClick = () => {
    setActiveFlag('frg')
  }

  return (
    <div className='activeTab'>
      <button type='button' onClick={onCrsTabClick}>
        クリスタル
      </button>
      <button type='button' onClick={onFrgTabClick}>
        フラグメント
      </button>
    </div>
  )
}

UsrTab.propTypes = {
  setActiveFlag: PropTypes.func
}
