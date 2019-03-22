import React, {useEffect} from 'react'

export const Airticle = () => {
  /* ライフサイクル */
  useEffect(() => {
    return () => {}
  }, [])
  
  /* レンダリング */
  return(
    <div>Airticle</div>
  )
}