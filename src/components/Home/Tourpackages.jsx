import React from 'react';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const PACKAGES = [
  {
    id: 1,
    title: 'Cultural Triangle Tour',
    duration: '5 Days / 4 Nights',
    price: '$450',
    image: '/images/kandy.jpg',
    inclusions: [
      'Sigiriya Rock Fortress',
      'Dambulla Cave Temple',
      'Polonnaruwa Ruins',
      'Kandy Temple of Tooth'
    ],
    popular: false
  },
  {
    id: 2,
    title: 'Hill Country & Beach',
    duration: '7 Days / 6 Nights',
    price: '$680',
    image: '/images/mir.jpg',
    inclusions: [
      'Scenic Train Ride',
      'Tea Plantation Tour',
      'Ella Rock Hike',
      'Mirissa Beach Stay'
    ],
    popular: true
  },
  {
    id: 3,
    title: 'Wildlife Safari Explorer',
    duration: '3 Days / 2 Nights',
    price: '$320',
    image: '/images/c8.jpg',
    inclusions: [
      'Yala National Park',
      'Udawalawe Safari',
      'Elephant Transit Home',
      'Jungle Camping'
    ],
    popular: false
  }
];

export function TourPackages() {
  return (
    <section id="tours" className="py-24 bg-background bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block with Upward Fade Entry */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out fill-mode-forwards">
          <span className="text-accent text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
            Curated Experiences
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text text-slate-900 mb-4">
            Sri Lanka Tour Packages & Travels
          </h2>
          <p className="text-text-muted text-slate-600 max-w-2xl mx-auto text-lg">
            Carefully crafted itineraries by SL Travels that showcase the best of Sri Lanka.
            Enjoy scenic Ella travels, wild Udawalawa tours, pristine beaches, and ancient cultural heritage.
          </p>
        </div>

        {/* Package Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, index) => {
            // Generates staggered entry timing flags dynamically per index
            const delayClasses = [
              'delay-0',
              'delay-200 md:delay-[200ms]',
              'delay-500 md:delay-[400ms]'
            ];

            return (
              /* Inline Animated Structural Core Grid Node Wrapper */
              <div 
                key={pkg.id} 
                className={`w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-forwards ${delayClasses[index] || 'delay-0'}`}
              >
                <div
                  className={`bg-surface bg-white rounded-3xl overflow-hidden shadow-md border h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    pkg.popular 
                      ? 'border-accent border-emerald-500 ring-2 ring-emerald-500/20' 
                      : 'border-gray-100'
                  }`}
                >
                  {/* Card Banner Resource Element */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                    />
                    
                    {pkg.popular && (
                      <div className="absolute top-4 right-4 bg-accent bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold text-slate-900 shadow-sm">
                      <Clock className="w-4 h-4 text-primary text-blue-600" />
                      {pkg.duration}
                    </div>
                  </div>

                  {/* Card Information Elements */}
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-serif text-2xl font-bold text-text text-slate-900 leading-tight">
                        {pkg.title}
                      </h3>
                    </div>

                    <div className="text-3xl font-bold text-primary text-blue-600 mb-6">
                      {pkg.price}{' '}
                      <span className="text-sm font-normal text-text-muted text-slate-500">
                        / person
                      </span>
                    </div>

                    {/* Inclusive Item Checklist Grid */}
                    <div className="space-y-3 mb-8 flex-grow">
                      {pkg.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-text-muted text-slate-600 text-sm">{inc}</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Context Direct Action Controller */}
                    <button
                      className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm ${
                        pkg.popular 
                          ? 'bg-primary bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      Book Package
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}