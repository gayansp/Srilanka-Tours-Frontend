"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FadeIn } from './FadeIn';

const slides = [
  { image: '/images/elephant-riding-in-sigiriya.webp', tag: '#1 Udawalawa Tours & Wildlife Safari' },
  { image: '/images/sigiriya-elephant-rides-sri-lanka.webp', tag: 'Sri Lanka Tours & Ella Travels' },
  { image: '/images/uil.jpg', tag: 'SL Travels & Tropical Ceylon Beaches' },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide — 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-6 py-[50px] pb-[60px] overflow-hidden w-full">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center bg-primary transition-opacity duration-[1200ms] ease-in-out ${
            i === current ? 'opacity-100 z-0' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(10,25,15,0.88)_0%,_rgba(10,25,15,0.5)_60%,_rgba(10,25,15,0.2)_100%)] z-10 pointer-events-none" />

      {/* Content */}
      <FadeIn direction="up" className="relative z-20 max-w-[600px] md:ml-[8%] ml-0 mt-[-10px]">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-sans text-xs px-3.5 py-1.5 rounded-full mb-[22px] backdrop-blur-[8px]">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {slides[current].tag}
        </div>

        <h1 className="font-playfair text-[clamp(36px,5.5vw,64px)] text-white leading-[1.15] mb-[18px] tracking-[-1px] font-bold">
  <span className="text-[clamp(44px,6.5vw,80px)] block">
    Sri Lanka Tours
  </span>
  <span className="text-accent block"> & Udawalawa Safari</span>
</h1>

        <p className="font-sans text-base text-white/75 leading-[1.7] mb-[30px] max-w-[460px]">
          Experience unforgettable adventures with SL Travels. Book your Udawalawa tours,
          scenic Ella travels, national park safaris, and custom Sri Lanka travelling packages today.
        </p>

        <div className="flex gap-3 flex-wrap mb-10 max-md:flex-col">
          <a href="#calculator" className="font-sans text-[15px] font-medium bg-accent hover:bg-accent-hover text-white px-[26px] py-[13px] rounded-lg no-underline transition-all duration-200 hover:-translate-y-[2px] text-center">
            Calculate Trip Cost
          </a>
          <Link href="/tours" className="font-sans text-[15px] font-medium bg-white/12 border border-white/30 text-white px-[26px] py-[13px] rounded-lg no-underline backdrop-blur-[8px] transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/22 text-center">
            Explore Packages
          </Link>
        </div>

        <div className="flex items-center gap-7 flex-wrap">
          <div className="flex items-center gap-2.5 font-sans text-xs text-white/80">
            <div className="flex">
              <img src="/images/WhatsApp Image 2026-05-27 at 13.45.42.jpeg" alt="" className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover bg-[#2d5a3d]" />
              <img src="/images/WhatsApp Image 2026-05-27 at 13.45.46.jpeg" alt="" className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover bg-[#2d5a3d]" />
              <img src="/images/WhatsApp Image 2026-05-27 at 13.45.33.jpeg" alt="" className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover bg-[#2d5a3d]" />
            </div>
            <span>2,500+ Happy Travelers</span>
          </div>
          <div className="flex items-center gap-2 font-sans text-xs text-white/80">
            <span className="text-[#f59e0b] text-[15px]">★★★★★</span>
            <span>4.9/5 Rating</span>
          </div>
        </div>
      </FadeIn>

      {/* Dot indicators */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full border-none cursor-pointer transition-all duration-300 p-0 ${
              i === current ? 'bg-accent scale-[1.3]' : 'bg-white/40'
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
