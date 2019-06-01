import React from 'react'
import PropTypes from 'prop-types'
import withProps from 'recompose/withProps'
import {Route, Switch, Redirect} from 'react-router-dom'
import {setFlashStr} from 'components/layouts/axios/then_catch_funcs'
import {Top} from 'packs/home/top'
import {About} from 'packs/home/about'
import {ShwIndex} from 'packs/showcases/index'
import {FrgNew} from 'packs/fragments/new'
import {FrgShow} from 'packs/fragments/show'
import {FrgEdit} from 'packs/fragments/edit'
import {CrsIndex} from 'packs/crystals/index'
import {FrgIndex} from 'packs/fragments/index'
import {UsrIndex} from 'packs/users/index'
import {Signin} from 'packs/users/signin'

export const Routes = ({isSignin, onGenChange}) => {
  /* raw component に props 付加 */
  const AddGenPropsTo = (rawComp) => {
    const compWithProps = withProps({onGenChange})(rawComp)
    return compWithProps
  }

  return (
    <main id='mainWrap'>
      <Switch>
        <Route exact path={['/', '/top']} render={Top} />
        <Route exact path='/about' render={About} />
        <Route exact path='/users' render={AddGenPropsTo(UsrIndex)} />
        <Route exact path='/signin' render={AddGenPropsTo(Signin)} />
        <Route exact path='/fragments' render={AddGenPropsTo(FrgIndex)} />
        <AuthRoute
          isSignin={isSignin}
          onGenChange={onGenChange}
          path='/showcases'
          authComp={AddGenPropsTo(ShwIndex)}
        />
        <AuthRoute
          isSignin={isSignin}
          onGenChange={onGenChange}
          path='/crystals'
          authComp={AddGenPropsTo(CrsIndex)}
        />
        <AuthRoute
          isSignin={isSignin}
          onGenChange={onGenChange}
          path='/fragments/new'
          authComp={AddGenPropsTo(FrgNew)}
        />
        <AuthRoute
          isSignin={isSignin}
          onGenChange={onGenChange}
          path='/fragments/:id/edit'
          authComp={AddGenPropsTo(FrgEdit)}
        />
        {/* :id 回避 */}
        <Route exact path='/fragments/:id' render={AddGenPropsTo(FrgShow)} />
      </Switch>
    </main>
  )
}

const AuthRoute = ({isSignin, onGenChange, path, authComp: AuthComp}) => {
  let authRoute = null // return
  if (isSignin) {
    authRoute = <Route exact path={path} render={AuthComp} />
  } else {
    onGenChange(setFlashStr('er-auth'))
    authRoute = <Redirect exact to='/signin' />
  }
  return authRoute
}

Routes.propTypes = {
  isSignin: PropTypes.bool,
  onGenChange: PropTypes.func
}

AuthRoute.propTypes = {
  isSignin: PropTypes.bool,
  onGenChange: PropTypes.func,
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
