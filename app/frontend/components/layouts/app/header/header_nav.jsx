import React from 'react'
import {NavLink} from 'react-router-dom'

export const HeaderNav = () => {
  let tglNavLink = null

  /* サインイン 状態確認 */
  const isSignin = localStorage.getItem('token') === true

  /* サインイン状態で表示変更 */
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
        <li>サインアウト</li>
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
          <NavLink to='/users/signin'>サインイン</NavLink>
        </li>
      </>
    )
  }

  return (
    <nav className='headerNavWrap'>
      HeaderNav
      <ul className='headerNavList'>{tglNavLink}</ul>
    </nav>
  )
}
