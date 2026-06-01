import React, { useState, useEffect } from 'react'
import Hero from '../components/Home/Hero'
import Header from '../components/Home/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import NotFound from "../pages/NoFound"
import { WhyChooseUs } from '../components/Home/Chooseus'
import Footer from '../components/Home/Footer'
import UserDash from './UserDash'
import { Destinations } from '../components/Home/Destination'
import { TourPackages } from '../components/Home/Tourpackages'
import { Gallery } from '../components/Home/Gallery'
import { Reviews } from '../components/Home/Reviews'
import { Contactus } from '../components/Home/Contactus'
import { PageWrapper } from '../components/PageWrapper'
import { AnimatePresence, motion } from 'framer-motion'

const Dashboard = () => {
  const location = useLocation();
  const [navTransition, setNavTransition] = useState(false);

  useEffect(() => {
    setNavTransition(true);
    const timer = setTimeout(() => {
      setNavTransition(false);
    }, 550);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<PageWrapper><UserDash /></PageWrapper>} />
            <Route path='/destinations' element={<PageWrapper><Destinations /></PageWrapper>} />
            <Route path='/tours' element={<PageWrapper><TourPackages /></PageWrapper>} />
            <Route path='/gallery' element={<PageWrapper><Gallery /></PageWrapper>} />
            <Route path='/about' element={<PageWrapper><Reviews /></PageWrapper>} />
            <Route path='/contact' element={<PageWrapper><Contactus /></PageWrapper>} />
            <Route path='/*' element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Navigation transition overlay */}
      <AnimatePresence>
        {navTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ 
                scale: [0.75, 1.05, 1], 
                opacity: 1,
                filter: [
                  "drop-shadow(0 0 0px rgba(16,185,129,0))", 
                  "drop-shadow(0 0 12px rgba(16,185,129,0.25))", 
                  "drop-shadow(0 0 0px rgba(16,185,129,0))"
                ]
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-4"
            >
              <img 
                src="/public/images/udawalawe_tours_hq(2).png" 
                alt="Transition Logo" 
                className="h-20 w-auto object-contain select-none"
              />
              <div className="w-16 h-[2px] bg-[#1a3a2a]/10 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-emerald-600 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dashboard