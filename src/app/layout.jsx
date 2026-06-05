"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import '../index.css';

export default function RootLayout({ children }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const pathname = usePathname();
  const [navTransition, setNavTransition] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!initialLoading) {
      setNavTransition(true);
      const timer = setTimeout(() => {
        setNavTransition(false);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [pathname, initialLoading]);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Udawalawe Safari & Tours</title>
      </head>
      <body className="antialiased">
        <Toaster />
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
                  src="/images/udawalawe_tours_hq(2).png"
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
              {children}
            </motion.div>
          )}
        </AnimatePresence>

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
                  src="/images/udawalawe_tours_hq(2).png" 
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
      </body>
    </html>
  );
}
