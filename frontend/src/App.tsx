import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoute } from './routes/private.route'
import { getCurrentUser } from './services/auth.service'
import useAuthStore from './stores/user.store'
import Home from './views/home.view'
import Login from './views/login.view'
import Register from './views/register.view'
import NotFound from './views/not-found.view'
import { OAuth2RedirectHandler } from './components/oauth2-redirect-handler.component'

function App() {
  const [setUser] = useAuthStore(state => [state.setUser, state.user])

  useEffect(() => {
    getCurrentUser().then((data) => {
      setUser(data)
    })
  }, [setUser])

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />}></Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
