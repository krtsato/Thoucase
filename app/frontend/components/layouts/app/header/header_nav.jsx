import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {SigninContext, FlashContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {removeToken, transFlash} from 'components/layouts/axios/then_catch_funcs'

export const HeaderNav = ({history}) => {
  let tglNavLink = null // return
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
        history.push('/') // リダイレクト
      })
      .catch((error) => {
        setFlashMsg(transFlash(error.response.headers.flash))
      })
  }

  /* signin していたら表示変更 */
  if (isSignin) {
    tglNavLink = (
      <>
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
    )
  } else {
    tglNavLink = (
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
  }

  return (
    <nav className='headerNav'>
      <ul className='headerNavList'>{tglNavLink}</ul>
    </nav>
  )
}

HeaderNav.propTypes = {
  history: PropTypes.object
}
