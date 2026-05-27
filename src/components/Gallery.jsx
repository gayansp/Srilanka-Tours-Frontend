import React from 'react';

const PHOTOS = [
  'public/images/WhatsApp Image 2026-05-27 at 13.45.57.jpeg',
  'public/images/WhatsApp Image 2026-05-27 at 13.45.58.jpeg',
  'public/images/WhatsApp Image 2026-05-27 at 13.46.03.jpeg',
  'public/images/WhatsApp Image 2026-05-27 at 13.46.04.jpeg',
  'public/images/WhatsApp Image 2026-05-27 at 13.46.05.jpeg' // Food
];

export function Gallery() {
  return (
    // Replaced bg-surface with clear structural fallbacks
    <section id="gallery" className="py-24 bg-surface bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Animated Header Block (Native Tailwind Fade) */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
          <span className="text-accent text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
            Visual Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text text-slate-900 mb-4">
            Moments in Sri Lanka
          </h2>
        </div>

        {/* Masonry-Style Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PHOTOS.map((photo, index) => {
            // Generates rhythmic delay timing sequences per index frame
            const delayClasses = [
              'delay-0',
              'delay-75 md:delay-[100ms]',
              'delay-100 md:delay-[200ms]',
              'delay-150 md:delay-[300ms]',
              'delay-200 md:delay-[400ms]',
              'delay-300 md:delay-[500ms]'
            ];

            return (
              /* Converted wrapper from <FadeIn> to an animation-ready native <div> */
              <div
                key={index}
                className={`rounded-2xl overflow-hidden shadow-sm border border-gray-100/50 animate-in fade-in zoom-in-95 duration-700 ease-out fill-mode-forwards ${delayClasses[index] || 'delay-0'} ${
                  index === 0 || index === 3 ? 'md:row-span-2' : ''
                }`}
              >
                <div className="relative group h-full w-full aspect-square md:aspect-auto">
                  <img
                    src={photo}
                    alt={`Sri Lanka Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Subtle dark tint layer appearing overlay on interactive image focus */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}