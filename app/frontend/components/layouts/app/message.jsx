import React from 'react'
import PropTypes from 'prop-types'

export const Message = ({errMsgs, flashMsg}) => {
  return (
    <aside id='message'>
      <div className='flash'>{flashMsg}</div>
      <div className='error'>
        <p className='cclMsg'>{errMsgs.cclMsg}</p>
        <p className='errMsg'>{errMsgs.errMsg}</p>
      </div>
    </aside>
  )
}

Message.propTypes = {
  errMsgs: PropTypes.object,
  flashMsg: PropTypes.string
}
