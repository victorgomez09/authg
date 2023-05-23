import { Route, Routes } from 'react-router-dom'

import './App.css'
import { PrivateRoute } from './routes/private.route'
import Home from './views/home.view'
import Auth from './views/auth.view'
import NotFound from './views/not-found.view'

function App() {

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
      </Route>

      <Route path="/auth" element={<Auth />} />

      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App
