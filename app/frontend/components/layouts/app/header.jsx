import React from 'react'
import withProps from 'recompose/withProps'
import {Route} from 'react-router-dom'
import {SiteTitle} from 'components/layouts/app/header/site_title'
import {HeaderNav} from 'components/layouts/app/header/header_nav'

export const Header = (props) => {
  /* raw component に props 付加 */
  const AddPropsTo = (rawComp) => {
    const compWithProps = withProps({...props})(rawComp)
    return compWithProps
  }

  return (
    <header id='headerWrap'>
      <SiteTitle />
      <Route render={AddPropsTo(HeaderNav)} />
    </header>
  )
}
