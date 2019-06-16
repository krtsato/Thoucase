import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {GenProvider} from 'components/layouts/app/context'
import {Header} from 'components/layouts/app/header'
import {Message} from 'components/layouts/app/message'
import {Routes} from 'components/layouts/app/routes'
import {Footer} from 'components/layouts/app/footer'

export const App = () => (
  <BrowserRouter>
    <GenProvider>
      <Message />
      <Header />
      <Routes />
      <Footer />
    </GenProvider>
  </BrowserRouter>
)
