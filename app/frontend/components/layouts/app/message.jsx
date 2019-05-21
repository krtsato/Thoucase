import React from 'react'
import PropTypes from 'prop-types'

export const Message = ({cclMsg, flashMsg, invldMsg}) => {
  /* form バリデーション 表示 */
  let invldMsgList = null

  if (invldMsg !== []) {
    invldMsgList = invldMsg.map((pair) => (
      <div className='invalid' key={pair.key}>
        {pair.msg}
      </div>
    ))
  }

  return (
    <aside id='message'>
      <div className='flash'>{flashMsg}</div>
      <div className='cancel'>{cclMsg}</div>
      {invldMsgList}
    </aside>
  )
}

Message.propTypes = {
  cclMsg: PropTypes.string,
  flashMsg: PropTypes.string,
  invldMsg: PropTypes.array
}
