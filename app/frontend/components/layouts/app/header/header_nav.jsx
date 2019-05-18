import React from 'react'
import PropTypes from 'prop-types'
import {NavLink, withRouter} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {removeToken, setFlashStr, setErrObj} from 'components/layouts/axios/then_catch_funcs'

export const HeaderNav = withRouter(({history, isSignin, onGenChange}) => {
  let tglNavLink = null // return

  /* サインアウト */
  const onClick = () => {
    axiosRails
      .post('/signout')
      .then((response) => {
        removeToken('authToken')
        onGenChange(setFlashStr(response.headers.flash))
        history.push('/') // リダイレクト
      })
      .catch((error) => {
        onGenChange(setErrObj(error))
      })
  }

  /* Signin していたら表示変更 */
  if (isSignin) {
    tglNavLink = (
      <>
        <li>
          <NavLink to='/fragments'>フラグメント一覧</NavLink>
        </li>
        <li>
          <NavLink to='/fragments/new'>新規フラグメント</NavLink>
        </li>
        <li>
          <NavLink to='/users'>ユーザー覧</NavLink>
        </li>
        <li>マイページ</li>
        <li>
          <NavLink to='' onClick={onClick}>
            サインアウト
          </NavLink>
        </li>
      </>
    )
  } else {
    tglNavLink = (
      <>
        <li>
          <NavLink to='/'>トップページ</NavLink>
        </li>
        <li>
          <NavLink to='/about'>Thoucaseについて</NavLink>
        </li>
        <li>
          <NavLink to='/users'>ユーザ一覧</NavLink>
        </li>
        <li>
          <NavLink to='/signin'>サインイン</NavLink>
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
