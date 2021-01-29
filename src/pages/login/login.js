/* eslint-disable react/jsx-handler-names */
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button, Grid } from '@material-ui/core'
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg'

const firebaseConfig = {
  apiKey: 'AIzaSyCQwM7pmSN8sVeGRtdEeLb_6miKxaHRQKA',
  authDomain: 'reactzzaria-f7f87.firebaseapp.com',
  projectId: 'reactzzaria-f7f87',
  storageBucket: 'reactzzaria-f7f87.appspot.com',
  messagingSenderId: '868530884207',
  appId: '1:868530884207:web:eae04c5a8851804f43c79a',
  measurementId: 'G-5XRMY3R3CC'
}

firebase.initializeApp(firebaseConfig)

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  const login = useCallback(() => {
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }, [])

  const logout = useCallback(() => {
    firebase.auth().signOut().then(() => {
      setUserInfo({
        isUserLoggedIn: false,
        user: null
      })
    })
  }, [])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      setUserInfo({
        isUserLoggedIn: !!user,
        user
      })
    })
  }, [])

  const { isUserLoggedIn, user } = userInfo

  return (
    <Container>
      <Grid container justify='center' spacing={5}>
        <Grid item>
          <Logo />
        </Grid>
        <Grid item xs={12} container justify='center'>
          {isUserLoggedIn && (
            <>
              <pre>{user.uid}</pre>
              <Button variant='contained' onClick={logout}>Sair</Button>
            </>
          )}
          {!isUserLoggedIn && (
            <GitHubButton onClick={login}>Entrar com Github
            </GitHubButton>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

const Logo = styled(MainLogo)`
  width: 100%;
`

const Container = styled.div`
  padding: 20px;
`

const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true
})`
  && {
    font-size: 25px;
    max-width: 480px;
    padding: 15px;
    text-transform: none;
  }
`

export default Login
