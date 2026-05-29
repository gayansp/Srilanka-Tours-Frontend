
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminMiddleware from './middleware/AdminMiddleware'
import AdminDashboard from './pages/admin/AdminDashboard'
import UnAuthorizedPage from './pages/UnAuthorizedPage'
import Header from './components/Home/Header'
import Hero from './components/Home/Hero'
import NotFound from "./pages/NoFound"
import AdminDash from './pages/admin/Admin'
import AHeader from './components/admin/AHeader'
import { Toaster } from 'react-hot-toast'

function App() {


  return (
    <>
      <Toaster/>
      <Header />
      <AHeader />
      <Routes>
        {/* Normal Routes */}
        <Route path='/*' element={<Dashboard />} />
        
        {/* <Route path='/about' element={<About />} /> */}

        {/* admin routes */}
        <Route element={<AdminMiddleware />}>
          <Route path='/admin/*' element={<AdminDashboard />} />

        </Route>

        {/* No Protect */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/unauthorized' element={<UnAuthorizedPage />} />
        </Routes>
    </>
  )
}

export default App
