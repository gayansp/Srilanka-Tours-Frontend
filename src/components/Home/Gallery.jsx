import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { WifiOff, RefreshCw, CircleCheck, ImageOff } from 'lucide-react';
import ErrorPage from '../../pages/ErrorPage';

export function Gallery() {

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
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
          <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
            Visual Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Moments in Sri Lanka
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => {
            const delayClasses = [
              'delay-0',
              'delay-75 md:delay-[100ms]',
              'delay-100 md:delay-[200ms]',
              'delay-150 md:delay-[300ms]',
              'delay-200 md:delay-[400ms]',
              'delay-300 md:delay-[500ms]'
            ];

            return (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden shadow-sm border border-gray-100/50 animate-in fade-in zoom-in-95 duration-700 ease-out fill-mode-forwards ${delayClasses[index] || 'delay-0'} ${
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
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}