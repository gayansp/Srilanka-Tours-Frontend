import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { WifiOff, RefreshCw, CircleCheck, ImageOff, ArrowRight } from 'lucide-react';
import ErrorPage from '../../views/ErrorPage';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 85, 
      damping: 15 
    } 
  }
};

export function Gallery({ limit }) {

  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchGallery = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await api.get("gallery/get");
      setPhotos(response.data.galleryImages);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast.error('Somthing went wrong');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const displayedPhotos = limit
    ? [...photos]
        .sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          if (a._id && b._id) {
            return b._id.localeCompare(a._id);
          }
          return 0;
        })
        .slice(0, limit)
    : photos;

  // ─── Loading State ───────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header skeleton */}
          <div className="text-center mb-16">
            <div className="h-4 w-28 bg-gray-200 rounded-full animate-pulse mx-auto mb-3" />
            <div className="h-10 w-72 bg-gray-200 rounded-full animate-pulse mx-auto" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-gray-100 animate-pulse ${
                  i === 0 || i === 3 ? 'md:row-span-2 aspect-[3/4]' : 'aspect-square'
                }`}
              />
            ))}
          </div>

        </div>
      </section>
    );
  }

  // ─── Error State ─────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <ErrorPage/>
    );
  }

  // ─── Empty State ─────────────────────────────────────────────────────────────
  if (photos.length === 0) {
    return (
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">

            <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-6">
              <ImageOff className="w-9 h-9 text-gray-400" />
            </div>

            <h2 className="text-2xl font-medium text-slate-900 mb-2">
              No images yet
            </h2>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              The gallery is empty. Add some images from the admin panel to get started.
            </p>

          </div>
        </div>
      </section>
    );
  }

  // ─── Success State ───────────────────────────────────────────────────────────
  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {limit ? (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
                Visual Journey
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Moments in Sri Lanka
              </h2>
              <p className="text-slate-600 text-lg">
                Experience the vibrant culture, breathtaking landscapes, and unforgettable moments captured across our beautiful island.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-primary text-blue-600 font-semibold hover:text-emerald-600 transition-colors group no-underline"
            >
              View All Gallery
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
            <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
              Visual Journey
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Moments in Sri Lanka
            </h2>
          </div>
        )}

        {limit ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6"
          >
            {displayedPhotos.map((photo, index) => {
              const colSpan = index === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1';

              return (
                <motion.div
                  key={photo._id || index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`group relative rounded-2xl overflow-hidden border border-gray-100/50 shadow-sm w-full h-full hover:shadow-xl transition-all duration-300 ${colSpan}`}
                >
                  <div className="relative h-full w-full">
                    <img
                      src={photo.image}
                      alt={`Sri Lanka Gallery ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {displayedPhotos.map((photo, index) => {
              return (
                <motion.div
                  key={photo._id || index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`rounded-2xl overflow-hidden shadow-sm border border-gray-100/50 hover:shadow-xl transition-all duration-300 ${
                    index === 0 || index === 3 ? 'md:row-span-2' : ''
                  }`}
                >
                  <div className="relative group h-full w-full aspect-square md:aspect-auto">
                    <img
                      src={photo.image}
                      alt={`Sri Lanka Gallery ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}