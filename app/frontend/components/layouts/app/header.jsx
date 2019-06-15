import React from 'react'
import {Route} from 'react-router-dom'
import {SiteTitle} from 'components/layouts/app/header/site_title'
import {HeaderNav} from 'components/layouts/app/header/header_nav'

export const Header = () => (
  <header id='headerWrap'>
    <SiteTitle />
    <Route render={HeaderNav} />
  </header>
)
