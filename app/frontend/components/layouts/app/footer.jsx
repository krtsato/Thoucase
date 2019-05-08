import React from 'react'
import {FooterNav} from 'components/layouts/app/footer/footer_nav'
import {SocialList} from 'components/layouts/app/footer/social_list'
import {Copyright} from 'components/layouts/app/footer/copyright'

export const Footer = () => {
  return (
    <footer id='footerWrap'>
      <section id='footerContents'>
        <FooterNav />
        <SocialList />
        <Copyright />
      </section>
    </footer>
  )
}
