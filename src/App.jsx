
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
<<<<<<< HEAD
      <Toaster />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {initialLoading ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-tr from-[#1a3a2a] via-[#122b1f] to-[#0a2217] text-white"
          >
            <div className="flex flex-col items-center gap-6 max-w-sm px-6 text-center">
              <motion.img
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.34, 1.56, 0.64, 1] 
                }}
                src="/public/images/udawalawe_tours_hq(2).png"
                alt="Udawalawe Tours Logo"
                className="h-32 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-white/10 p-4 rounded-3xl backdrop-blur-md"
              />
              
              <div className="flex flex-col items-center w-full gap-3 mt-2">
                <div className="w-48 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                    className="absolute top-0 bottom-0 w-1/2 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-xs tracking-[0.25em] text-emerald-400 font-bold uppercase select-none"
                >
                  Explore Sri Lanka
                </motion.p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Routes>
              {/* Normal Routes */}
              <Route path='/*' element={<Dashboard />} />
              
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
