import React from 'react'
import PropTypes from 'prop-types'
import {NavLink, withRouter} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {removeToken, setFlashStr, setSninBool} from 'components/layouts/axios/then_catch_funcs'

export const HeaderNav = withRouter(({history, isSignin, onGenChange}) => {
  let tglNavLink = null // return

  /* signout */
  const onSnoutClick = () => {
    axiosRails
      .post('/signout')
      .then((response) => {
        removeToken('authToken')
        onGenChange(Object.assign(setSninBool(response.headers.flash), setFlashStr(response.headers.flash)))
        history.push('/') // リダイレクト
      })
      .catch((error) => {
        onGenChange(setFlashStr(error.response.headers.flash))
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
    <nav className='headerNavWrap'>
      <ul className='headerNavList'>{tglNavLink}</ul>
    </nav>
  )
})

HeaderNav.propTypes = {
  isSignin: PropTypes.bool,
  onGenChange: PropTypes.func
}
