import React, {useContext} from 'react'
import {CancelContext, FlashContext, InvldContext} from 'components/layouts/app/context'

export const Message = () => {
  /* form バリデーション 表示 */
  let invldMsgList = null
  const {cclMsg} = useContext(CancelContext)
  const {flashMsg} = useContext(FlashContext)
  const {invldMsg} = useContext(InvldContext)

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
