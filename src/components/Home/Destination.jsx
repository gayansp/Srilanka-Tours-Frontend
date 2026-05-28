import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DESTINATIONS = [
  {
    id: 1,
    name: 'Sigiriya',
    tagline: 'The Ancient Rock Fortress',
    image: '/images/sigiriya-elephant-rides-sri-lanka.webp',
    colSpan: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 2,
    name: 'Ella',
    tagline: 'Misty Mountains & Tea',
    image: 'public/images/ella2.jpg',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 3,
    name: 'Galle',
    tagline: 'Colonial Charm & Coast',
    image: 'public/images/galle.jpg',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 4,
    name: 'Yala',
    tagline: 'Wildlife & Leopards',
    image: 'public/images/yala.jpg',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 5,
    name: 'Mirissa',
    tagline: 'Whales & Golden Sands',
    image: 'public/images/mirissa.jpg',
    colSpan: 'md:col-span-1 md:row-span-1'
  }
];

export function Destinations() {
  return (
    // Added safety fallback bg-gray-50 if bg-surface isn't defined
    <section id="destinations" className="py-24 bg-surface bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Changed from <FadeIn> to clean flex <div> */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            {/* Added text-emerald-600 fallback for text-accent */}
            <span className="text-accent text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
              Explore Sri Lanka
            </span>
            {/* Added text-slate-900 fallback for text-text */}
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text text-slate-900 mb-4">
              Popular Destinations
            </h2>
            {/* Added text-slate-600 fallback for text-text-muted */}
            <p className="text-text-muted text-slate-600 text-lg">
              From ancient ruins to pristine beaches, discover the most
              breathtaking locations our beautiful island has to offer.
            </p>
          </div>
          {/* Added text-blue-600 fallback for text-primary */}
          <Link to="/destinations" className="inline-flex items-center gap-2 text-primary text-blue-600 font-semibold hover:text-emerald-600 transition-colors group no-underline">
            View All Destinations
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
          {DESTINATIONS.map((dest) => (
            /* Changed from <FadeIn> to standard structural <div> to eliminate module errors */
            <div
              key={dest.id}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer w-full h-full ${dest.colSpan}`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                  {dest.name}
                </h3>
                <p className="text-white/80 text-sm md:text-base transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {dest.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}