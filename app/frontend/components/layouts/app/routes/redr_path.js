import {useContext} from 'react'
import {RedrContext} from 'components/layouts/app/context'

export const RedrPath = () => {
  /*
    各コンポーネントから更新された redrPath が まず描画される
    setRedrPath によって redrPath は null に初期化
    同じリダイレクト処理を繰り返しても, redrPath が更新される
  */
  const {redrPath, setRedrPath} = useContext(RedrContext)
  setRedrPath(null)

  return redrPath
}
