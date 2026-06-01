
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminMiddleware from './middleware/AdminMiddleware';
import AdminDashboard from './pages/admin/AdminDashboard';
import UnAuthorizedPage from './pages/UnAuthorizedPage';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
