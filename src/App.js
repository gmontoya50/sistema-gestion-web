import React, { Suspense, useEffect, useReducer } from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import { CSpinner } from '@coreui/react-pro'
import { AuthContext } from './auth/authContext'
import { authReducer } from './auth/authReducer'
import { ProtectedRoute } from './routers/ProtectedRoute'
import './scss/style.scss'
import { PublicRoute } from './routers/PublicRoute'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Login = React.lazy(() => import('./views/login/Login'))

const init = () => {
  return (
    (!!localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) || {
      logged: false,
    }
  )
}
export default function App() {
  const [user, dispatch] = useReducer(authReducer, {}, init)
  useEffect(() => {
    if (!user) return
    localStorage.setItem(
      'user',
      JSON.stringify({ email: user.email, logged: user.logged, token: user.token, role: user.role }),
    )
  }, [user])

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <HashRouter>
        <Suspense fallback={<CSpinner color="primary" />}>
          <Switch>
            <PublicRoute
              exact
              path="/login"
              name="Login Page"
              component={(props) => <Login {...props} />}
            />
            <ProtectedRoute
              path="/"
              name="Home"
              component={(props) => <DefaultLayout {...props} />}
            />
            {/* <Route
              path="/"
              name="Home"
              render={(props) => <DefaultLayout {...props} />}
            /> */}
          </Switch>
        </Suspense>
      </HashRouter>
    </AuthContext.Provider>
  )
}

// export default App;
