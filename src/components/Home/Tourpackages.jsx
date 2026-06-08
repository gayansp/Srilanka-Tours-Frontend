"use client";

import React, { useEffect, useState } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export function TourPackages({ showViewAll = true }) {
  const [allTourpackages, setAllTourpackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchTours = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/tourpackages/all");
      setAllTourpackages(response.data.data || response.data.date || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast.error('Something went wrong fetching tour packages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading && allTourpackages.length === 0) {
    return (
      <div className="text-center py-24 text-lg font-medium bg-slate-50">
        Loading Tour Packages...
      </div>
    );
  }

  return (
    <section id="tours" className="py-24 bg-background bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out fill-mode-forwards">
          <div className="max-w-2xl text-left">
            <span className="text-accent text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
              Curated Experiences
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text text-slate-900 mb-4">
              Sri Lanka Tour Packages & Travels
            </h2>
            <p className="text-text-muted text-slate-600 text-lg">
              Carefully crafted itineraries by SL Travels that showcase the best of Sri Lanka.
              Enjoy scenic Ella travels, wild Udawalawa tours, pristine beaches, and ancient cultural heritage.
            </p>
          </div>
          {showViewAll && (
            <Link href="/tours" className="inline-flex items-center gap-2 text-primary text-blue-600 font-semibold hover:text-emerald-600 transition-colors group no-underline shrink-0">
              View All Tours
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Package Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allTourpackages.slice().reverse().slice(0, 3).map((pkg, index) => {
            const delayClasses = [
              'delay-0',
              'delay-200 md:delay-[200ms]',
              'delay-500 md:delay-[400ms]'
            ];

            return (
              <div 
                key={pkg._id} 
                className={`w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-forwards ${delayClasses[index % 3] || 'delay-0'}`}
              >
                <div
                  className={`bg-surface bg-white rounded-3xl overflow-hidden shadow-md border h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    pkg.popular 
                      ? 'border-accent border-emerald-500 ring-2 ring-emerald-500/20' 
                      : 'border-gray-100'
                  }`}
                >
                  {/* Card Banner */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={pkg.imageUrl}
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
                      {pkg.numberOfDays} Days
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="font-serif text-2xl font-bold text-text text-slate-900 leading-tight mb-4">
                      {pkg.title}
                    </h3>

                    <div className="h-[120px] overflow-y-auto mb-6 pr-2">
                      <p className="text-sm text-slate-600 leading-relaxed text-justify">
                        {pkg.details}
                      </p>
                    </div>

                    <div className="text-3xl font-bold text-primary text-emerald-700 mb-6 mt-auto">
                      Rs. {pkg.pricePerPerson}{' '}
                      <span className="text-sm font-normal text-text-muted text-slate-500">
                        / person
                      </span>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => router.push(`/tour-details/${pkg._id}`)}
                      className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm ${
                        pkg.popular 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
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