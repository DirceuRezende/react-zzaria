import React from 'react'
import { Switch, Route } from 'react-router-dom'

const routes = [
  { path: '/rota1', content: 'Rota 1' },
  { path: '/rota2', content: 'Rota 2' }
]

const Main = () => (
  <>
    <h1>Main</h1>
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          render={(pros) => <h2>{route.content}</h2>}
        />
      ))}
    </Switch>
  </>
)

export default Main
