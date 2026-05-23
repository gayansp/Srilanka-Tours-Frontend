
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminMiddleware from './middleware/AdminMiddleware'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {


  return (
    <>
      <h1>This is navbar</h1>
      <Routes>
        a

        {/* admin routes */}
        <Route element={<AdminMiddleware/>}>
          <Route path='/adminDashboard' element={<AdminDashboard/>} />
        </Route>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
