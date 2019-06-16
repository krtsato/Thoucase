import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch, Redirect} from 'react-router-dom'
import {SigninContext, FlashContext} from 'components/layouts/app/context'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'
import {Top} from 'packs/home/top'
import {About} from 'packs/home/about'
import {Signin} from 'packs/users/signin'
import {UsrIndex} from 'packs/users/index'
import {UsrShow} from 'packs/users/show'
import {ShwIndex} from 'packs/showcases/index'
import {CrsIndex} from 'packs/crystals/index'
import {FrgIndex} from 'packs/fragments/index'
import {FrgNew} from 'packs/fragments/new'
import {FrgShow} from 'packs/fragments/show'
import {FrgEdit} from 'packs/fragments/edit'

export const Routes = () => (
  <main id='mainWrap'>
    <Switch>
      <Route exact path={['/', '/top']} render={Top} />
      <Route exact path='/about' render={About} />
      <Route exact path='/users' render={UsrIndex} />
      <Route exact path='/signin' render={Signin} />
      <Route exact path='/fragments' render={FrgIndex} />
      <AuthRoute path='/showcases' authComp={ShwIndex} />
      <AuthRoute path='/crystals' authComp={CrsIndex} />
      <AuthRoute path='/fragments/new' authComp={FrgNew} />
      <AuthRoute path='/fragments/:id/edit' authComp={FrgEdit} />
      {/* :id 回避 */}
      <Route exact path='/users/:id' component={UsrShow} />
      <Route exact path='/fragments/:id' render={FrgShow} />
    </Switch>
  </main>
)

const AuthRoute = ({path, authComp: AuthComp}) => {
  let authRoute = null // return
  const {isSignin} = useContext(SigninContext)
  const {setFlashMsg} = useContext(FlashContext)

  if (isSignin) {
    authRoute = <Route exact path={path} render={AuthComp} />
  } else {
    setFlashMsg(transFlash('er-auth'))
    authRoute = <Redirect exact to='/signin' />
  }
  return authRoute
}

AuthRoute.propTypes = {
  path: PropTypes.string,
  authComp: PropTypes.func
}

/* 追記予定
  <Route exact path='/users/new' component={UsrNew} />
  <Route exact path='/users/:id/edit' component={UsrEdit} />
  <Route exact path='/users/:id' component={UsrShow} />
  <Route exact path='/showcases/new' component={ShwNew} />
  <Route exact path='/showcases/:id/edit' component={ShwEdit} />
  <Route exact path='/showcases/:id' component={ShwShow} />
  <Route exact path='/crystals/new' component={CrsNew} />
  <Route exact path='/crystals/:id/edit' component={CrsEdit} />
  <Route exact path='/crystals/:id' component={CrsShow} />
  <Route exact path='/fragments/:id/edit' component={FrgEdit} />
  <Route exact path='/fragments/:id' component={FrgShow} />
*/
