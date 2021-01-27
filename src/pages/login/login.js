import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg'
import styled from 'styled-components'

const Login = () => (
  <Container>
    <Grid container justify='center' spacing={5}>
      <Grid item>
        <Logo />
      </Grid>
      <Grid item xs={12} container justify='center'>
        <GitHubButton>Entrar com Github</GitHubButton>
      </Grid>
    </Grid>
  </Container>
)

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
