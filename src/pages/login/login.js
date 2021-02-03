/* eslint-disable react/jsx-handler-names */
import React, { useContext } from 'react'
import styled from 'styled-components'
import { Button, Grid } from '@material-ui/core'
import { ReactComponent as MainLogo } from 'images/logo-react-zzaria.svg'
import { AuthContext } from 'contexts/auth'

const Login = () => {
  const { login } = useContext(AuthContext)

  return (
    <Container>
      <Grid container justify='center' spacing={5}>
        <Grid item>
          <Logo />
        </Grid>
        <Grid item xs={12} container justify='center'>
          <GitHubButton onClick={login}>Entrar com Github
          </GitHubButton>
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
