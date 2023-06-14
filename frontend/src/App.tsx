import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { OAuth2RedirectHandler } from './components/oauth2-redirect-handler.component'
import { PrivateRoute } from './routes/private.route'
import { getCurrentUser } from './services/auth.service'
import useAuthStore from './stores/user.store'
import Home from './views/home.view'
import Login from './views/login.view'
import Register from './views/register.view'
import NotFound from './views/not-found.view'
import Applications from './views/applications.view'
import ApplicationsCreate from './views/applications-create.view'
import ApplicationDetails from './views/applications-details.view'
import Users from './views/users.view'

function App() {
  const queryClient = new QueryClient()
  const [setUser] = useAuthStore(state => [state.setUser, state.user])

  useEffect(() => {
    getCurrentUser().then((data) => {
      setUser(data)
    })
  }, [setUser])

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/applications' element={<Applications />} />
          <Route path='/applications/create' element={<ApplicationsCreate />} />
          <Route path='/applications/:id' element={<ApplicationDetails />} />
          <Route path='/users' element={<Users />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />}></Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
