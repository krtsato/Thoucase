import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch, Redirect} from 'react-router-dom'
import {RedrContext, SigninContext, FlashContext} from 'components/layouts/app/context'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'
import {Top} from 'packs/home/top'
import {About} from 'packs/home/about'
import {Signin} from 'packs/users/signin'
import {UsrIndex} from 'packs/users/index'
import {UsrShow} from 'packs/users/show'
import {ShwIndex} from 'packs/showcases/index'
import {CrsIndex} from 'packs/crystals/index'
import {CrsShow} from 'packs/crystals/show'
import {CrsEdit} from 'packs/crystals/edit'
import {FrgIndex} from 'packs/fragments/index'
import {FrgNew} from 'packs/fragments/new'
import {FrgShow} from 'packs/fragments/show'
import {FrgEdit} from 'packs/fragments/edit'

export const Routes = () => {
  const {redrPath} = useContext(RedrContext)
  return (
    <main id='mainWrap'>
      {redrPath}
      <Switch>
        <Route exact strict path={['/', '/top']} render={Top} />
        <Route exact strict path='/about' render={About} />
        <Route exact strict path='/signin' render={Signin} />
        <Route exact strict path='/users' render={UsrIndex} />
        <Route exact strict path='/fragments' render={FrgIndex} />
        <Route exact strict path='/showcases' render={ShwIndex} />
        <Route exact strict path='/crystals' render={CrsIndex} />
        <AuthRoute path='/crystals/:id/edit' authComp={CrsEdit} />
        <AuthRoute path='/fragments/new' authComp={FrgNew} />
        <AuthRoute path='/fragments/:id/edit' authComp={FrgEdit} />
        {/* :id 回避 */}
        <Route exact path='/users/:id' render={UsrShow} />
        <Route exact path='/crystals/:id' render={CrsShow} />
        <Route exact path='/fragments/:id' render={FrgShow} />
      </Switch>
    </main>
  )
}

const AuthRoute = ({path, authComp: AuthComp}) => {
  const {isSignin} = useContext(SigninContext)
  const {setFlashMsg} = useContext(FlashContext)

  const authRoute = () => {
    if (isSignin) return <Route exact path={path} render={AuthComp} />
    setFlashMsg(transFlash('er-sign'))
    return <Redirect exact to='/signin' />
  }

  return authRoute()
}

AuthRoute.propTypes = {
  path: PropTypes.string,
  authComp: PropTypes.func
}

/* 追記予定
  <Route exact path='/users/new' component={UsrNew} />
  <Route exact path='/users/:id/edit' component={UsrEdit} />
  <Route exact path='/showcases/new' component={ShwNew} />
  <Route exact path='/showcases/:id/edit' component={ShwEdit} />
  <Route exact path='/showcases/:id' component={ShwShow} />
  <Route exact path='/crystals/new' component={CrsNew} />
*/
