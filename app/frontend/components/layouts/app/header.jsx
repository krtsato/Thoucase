import React from 'react'
import {SiteTitle} from 'components/layouts/app/header/site_title'
import {HeaderNav} from 'components/layouts/app/header/header_nav'

export const Header = () => {
  return (
    <header id='headerWrap'>
      <SiteTitle />
      <HeaderNav />
    </header>
  )
}
