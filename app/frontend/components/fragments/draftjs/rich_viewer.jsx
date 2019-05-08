import React, {useEffect} from 'react'
import {Header} from 'components/fragments/rich_viewer/header'
import {Airticle} from 'components/fragments/rich_viewer/airticle'
/**
 * To Do
 * ・Axios 利用
 *   ・user_id
 *   ・crystal_id
 *   ・name
 *   ・content
 *   ・create_at
 * ・edit 機能
 * ・delete 機能
 */
export const RichViewer = () => {
  /* ライフサイクル */
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <div>
      <Header />
      <Airticle />
    </div>
  )
}
