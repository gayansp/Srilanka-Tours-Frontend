
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminMiddleware from './middleware/AdminMiddleware'
import AdminDashboard from './pages/admin/AdminDashboard'
import UnAuthorizedPage from './pages/UnAuthorizedPage'
import Header from './components/Header'

function App() {


  return (
    <>
     <Header/>
      <Routes>
        {/* Normal Routes */}
        <Route path='/' element={<Dashboard/>}/>

        {/* admin routes */}
        <Route element={<AdminMiddleware/>}>
          <Route path='/adminDashboard/*' element={<AdminDashboard/>} />

        </Route>

        {/* No Protect */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/unauthorized' element={<UnAuthorizedPage/>}/>
      </Routes>
    </>
  )
}

export default App
