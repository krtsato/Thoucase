import React, {useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {Header} from 'components/layouts/app/header'
import {Footer} from 'components/layouts/app/footer'
import {Top} from 'packs/home/top'
import {About} from 'packs/home/about'
import {ShwIndex} from 'packs/showcases/index'
import {CrsIndex} from 'packs/crystals/index'
import {FrgIndex} from 'packs/fragments/index'
import {UsrIndex} from 'packs/users/index'
import {FrgNew} from 'packs/fragments/new'
import {Signin} from 'packs/users/signin'

export const App = () => {
  /* componentsDidMount */
  useEffect(() => {
    axiosRails.get('/').catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {/* Home */}
        <Route exact path={['/', '/top']} component={Top} />
        <Route path='/about' component={About} />
        {/* Users */}
        <Route exact path='/users' component={UsrIndex} />
        <Route path='/users/signin' component={Signin} />
        {/* Showcases */}
        <Route exact path='/showcases' component={ShwIndex} />
        {/* Crystals */}
        <Route exact path='/crystals' component={CrsIndex} />
        {/* Fragments */}
        <Route exact path='/fragments' component={FrgIndex} />
        <Route path='/fragments/new' component={FrgNew} />
        {/* 追記予定
        <Route path='/users/new' component={UsrNew} />
        <Route path='/users/:id/edit' component={UsrEdit} />
        <Route exact path='/users/:id' component={UsrShow} />
        <Route path='/showcases/new' component={ShwNew} />
        <Route path='/showcases/:id/edit' component={ShwEdit} />
        <Route exact path='/showcases/:id' component={ShwShow} />
        <Route path='/crystals/new' component={CrsNew} />
        <Route path='/crystals/:id/edit' component={CrsEdit} />
        <Route exact path='/crystals/:id' component={CrsShow} />
        <Route path='/fragments/:id/edit' component={FrgEdit} />
        <Route exact path='/fragments/:id' component={FrgShow} />
        */}
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}
