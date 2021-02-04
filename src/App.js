import React, { lazy, Suspense, useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import firebase from 'services/firebase'
import { AuthContext } from 'contexts/auth'
const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

const App = ({ location }) => {
  const { userInfo, setUserInfo, logout } = useContext(AuthContext)
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)

  const { isUserLoggedIn } = userInfo
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      setUserInfo({
        isUserLoggedIn: !!user,
        user: user && {
          ...user,
          firstName: user.displayName.split(' ')[0]
        }
      })
      setDidCheckUserIn(true)
    })
    window.logout = logout
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!didCheckUserIn) {
    return <LinearProgress />
  }

  if (isUserLoggedIn && location.pathname === '/login') {
    return <Redirect to='/' />
  }

  if (!isUserLoggedIn && location.pathname !== '/login') {
    return <Redirect to='/login' />
  }

  return (
    <>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={MainPage} />
        </Switch>
      </Suspense>
    </>
  )
}

App.propTypes = {
  location: PropTypes.object.isRequired
}

export default App
