import React from 'react';
import { Shield, Map, Clock, ThumbsUp, HeartHandshake, Car } from 'lucide-react';

const FEATURES = [
  {
    icon: Map,
    title: 'Local Expertise',
    desc: 'Deep knowledge of hidden gems and authentic Sri Lankan experiences.'
  },
  {
    icon: Shield,
    title: 'Safe & Reliable',
    desc: 'Fully licensed guides and well-maintained vehicles for your peace of mind.'
  },
  {
    icon: HeartHandshake,
    title: 'Custom Itineraries',
    desc: 'Tailor-made tours designed specifically around your interests and pace.'
  },
  {
    icon: ThumbsUp,
    title: 'Best Price Guarantee',
    desc: 'Transparent pricing with no hidden fees or unexpected charges.'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    desc: 'Round-the-clock assistance throughout your entire journey in Sri Lanka.'
  },
  {
    icon: Car,
    title: 'Comfortable Transport',
    desc: 'Modern, air-conditioned fleet ranging from cars to luxury coaches.'
  }
];

export function WhyChooseUs() {
  return (
    // Replaced bg-background with clean white section background
    <section id="about" className="py-24 bg-background bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Block with Native Slide In Animation */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000 ease-out fill-mode-forwards">
            <span className="text-accent text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
              Why Choose Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text text-slate-900 mb-6 leading-tight">
              Your Trusted Partner in Sri Lanka
            </h2>
            <p className="text-text-muted text-slate-600 text-lg mb-8 leading-relaxed">
              With over a decade of experience, Udawala Tours has been
              crafting unforgettable journeys across the island. We believe in
              sustainable tourism, supporting local communities, and providing
              our guests with genuine, heartfelt Sri Lankan hospitality.
            </p>

            {/* Feature Badges Grid Loop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              {FEATURES.slice(0, 4).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4 group">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 bg-emerald-50 text-primary text-emerald-600 flex items-center justify-center transition-colors group-hover:bg-emerald-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text text-slate-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-text-muted text-slate-500 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image Layout Canvas with Native Right Slide In Animation */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 ease-out fill-mode-forwards delay-150">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img
                src="public/images/WhatsApp Image 2026-05-27 at 13.45.51.jpeg"
                alt="Sri Lankan Guide"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Dynamic Interactive Float Counter Card */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex -space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        alt="User Avatar" 
                      />
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        alt="User Avatar" 
                      />
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        alt="User Avatar" 
                      />
                    </div>
                    <div className="text-sm font-bold text-text text-slate-900">
                      15k+ Guests
                    </div>
                  </div>
                  <p className="text-xs text-text-muted text-slate-500">
                    Have explored Sri Lanka with us
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative layout background blur dots */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}