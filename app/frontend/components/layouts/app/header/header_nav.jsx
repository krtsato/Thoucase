import React, {useContext} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {RedrContext, SigninContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {removeToken, transFlash} from 'components/layouts/axios/then_catch_funcs'

export const HeaderNav = () => {
  const {setRedrPath} = useContext(RedrContext)
  const {isSignin, setIsSignin} = useContext(SigninContext)
  const {setFlashMsg} = useContext(FlashContext)

  /* signout */
  const onSnoutClick = () => {
    axiosRails
      .post('/signout')
      .then((response) => {
        removeToken('authToken')
        setIsSignin(false)
        setFlashMsg(transFlash(response.headers.flash))
        setRedrPath(<Redirect exact to='/' />) // リダイレクト
      })
      .catch((error) => {
        setFlashMsg(transFlash(error.response.headers.flash))
      })
  }

  /* signin していたら表示変更 */
  const navLink = () =>
    isSignin ? (
      <>
        <li>
          <NavLink exact to='/crystals'>
            クリスタル一覧
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/fragments'>
            フラグメント一覧
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/fragments/new'>
            新規フラグメント
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/showcases'>
            展示中のショーケース
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/users'>
            ユーザー覧
          </NavLink>
        </li>
        <li>マイページ</li>
        <li>
          <NavLink to='' onClick={onSnoutClick}>
            サインアウト
          </NavLink>
        </li>
      </>
    ) : (
      <>
        <li>
          <NavLink exact to='/'>
            トップページ
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/about'>
            Thoucaseについて
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/fragments'>
            フラグメント一覧
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/users'>
            ユーザ一覧
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/signin'>
            サインイン
          </NavLink>
        </li>
      </>
    )

  return (
    <nav className='headerNav'>
      <ul className='headerNavList'>{navLink()}</ul>
    </nav>
  )
}
