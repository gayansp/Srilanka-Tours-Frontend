
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
import AdminDash from './pages/Admin'
import AHeader from './components/admin/AHeader'
import About from './pages/About'
import Contact from './pages/Contactus'




function App() {


  return (
    <>
      <Header />
      <AHeader />
      
      <Routes>
        {/* Normal Routes */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/*' element={<NotFound />} />
        
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        {/* admin routes */}
        
        <Route element={<AdminMiddleware />}>
        
          <Route path='/admin' element={<AdminDash />} />
          
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
