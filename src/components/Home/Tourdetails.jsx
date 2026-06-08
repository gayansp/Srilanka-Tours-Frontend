"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Calendar,
  ChevronDown,
  ArrowRight,
  Phone
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import api from '../../api/axios';


export function Tourdetails() {
  const { id } = useParams();
  const router = useRouter();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState('overview');
  const [openDay, setOpenDay] = useState(1);

  useEffect(() => {
  const fetchPackage = async () => {
    try {
      const response = await api.get(`/tourpackages/get/${id}`);
      setPkg(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchPackage();
  }

  window.scrollTo({ top: 0 });
}, [id]);

    const TABS = [
    { id: "overview", label: "Overview" },
    { id: "programme", label: "Programme" },
    { id: "locations", label: "Locations" }
    ];

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background font-sans text-text">
        <div className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Package not found
          </h1>
          <p className="text-text-muted mb-8">
            The tour package you're looking for doesn't exist.
          </p>
          <Link
            href="/#tours"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold">
            
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </Link>
        </div>
      </div>);

  }

    return (
        <div className="min-h-screen bg-background font-sans text-text">
    
          {/* Hero */}
          <section className="relative pt-28 pb-16 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={pkg.imageUrl}
                alt={pkg.title}
                className="w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40"></div>
            </div>
    
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
              <button
                onClick={() => router.push('/#tours')}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors">
                
                <ArrowLeft className="w-4 h-4" /> Back to Packages
              </button>
    
              {pkg.popular &&
              <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide mb-4">
                  Most Popular
                </span>
              }
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
                {pkg.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" /> {pkg.numberOfDays} Days
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" /> {pkg.locations?.map((loc) => (
                    <div key={loc._id}>
                        <h3>{loc.name}</h3>
                    </div>
                    ))}
                </span>
                <span className="text-2xl font-bold">
                  {pkg.pricePerPerson}{' '}
                  <span className="text-sm font-normal text-white/70">
                    / person
                  </span>
                </span>
              </div>
            </div>
          </section>
    
          {/* Tabs */}
          <div className="sticky top-[72px] z-30 bg-surface border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex gap-2 overflow-x-auto">
                {TABS.map((t) =>
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${tab === t.id ? 'text-primary' : 'text-text-muted hover:text-text'}`}>
                  
                    {t.label}
                    {tab === t.id &&
                  <motion.div
                    layoutId="pkg-tab"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full" />
    
                  }
                  </button>
                )}
              </div>
            </div>
          </div>
    
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                {tab === 'overview' &&
                <div className="space-y-10">
                    <div>
                      <h2 className="font-serif text-3xl font-bold text-text mb-6">
                        About This Tour
                      </h2>
                      <p className="text-text-muted pt-4 text-lg leading-relaxed text-justify max-w-3xl">
                        {pkg.aboutTourPackage}
                      </p>
                    </div>
                  </div>
                }
    
                {tab === 'programme' &&
                <div>
                    <h2 className="font-serif text-3xl font-bold text-text mb-2">
                      Programme ({pkg.days} Days)
                    </h2>
                    <p className="text-text-muted mb-8">
                      A day-by-day breakdown of your journey across Sri Lanka.
                    </p>
    
                    <div className="space-y-4">
                      {pkg.programme.map((day) => {
                      const isOpen = openDay === day.day;
                      return (
                        <div
                          key={day.day}
                          className="bg-surface rounded-2xl border border-gray-100 overflow-hidden">
                          
                            <button
                            onClick={() => setOpenDay(isOpen ? null : day.day)}
                            className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors">
                            
                              <div className="shrink-0 w-14 h-14 rounded-xl bg-primary text-white flex flex-col items-center justify-center">
                                <span className="text-[10px] uppercase tracking-wider opacity-70">
                                  Day
                                </span>
                                <span className="text-xl font-bold leading-none">
                                  {day.day}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-text">{day.title}</h3>
                              </div>
                              <ChevronDown
                              className={`w-5 h-5 text-text-muted transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                            
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen &&
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0
                              }}
                              animate={{
                                height: 'auto',
                                opacity: 1
                              }}
                              exit={{
                                height: 0,
                                opacity: 0
                              }}
                              transition={{
                                duration: 0.3
                              }}
                              className="overflow-hidden">
                              
                                  <div className="px-5 pb-6 pl-[88px] space-y-3">
                                    {day.description.map((p, i) =>
                                <p
                                  key={i}
                                  className="text-text-muted text-sm leading-relaxed">
                                  
                                        {p}
                                      </p>
                                )}
                                  </div>
                                </motion.div>
                            }
                            </AnimatePresence>
                          </div>);
    
                    })}
                    </div>
                  </div>
                }
    
                {tab === 'locations' &&
                <div>
                    <h2 className="font-serif text-3xl font-bold text-text mb-2">
                      Locations You'll Visit
                    </h2>
                    <p className="text-text-muted mb-8">
                      Explore the breathtaking places included in this tour.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {pkg.locations.map((loc, i) =>
                    <div
                      key={i}
                      className="group relative rounded-2xl overflow-hidden aspect-[4/3]">
                      
                          <img
                        src={loc.imageUrl}
                        alt={loc.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-accent" />
                            <h3 className="font-serif text-xl font-bold text-white">
                              {loc.name}
                            </h3>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                }
              </div>
    
              {/* Booking sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-32 bg-surface rounded-3xl border border-gray-100 shadow-soft p-8">
                  <div className="text-center pb-6 border-b border-gray-100 mb-6">
                    <div className="text-sm text-text-muted mb-1">
                      Starting from
                    </div>
                    <div className="text-4xl font-bold text-primary">
                      {pkg.pricePerPerson}
                    </div>
                    <div className="text-sm text-text-muted">per person</div>
                  </div>
    
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-text-muted">
                        Number of Days:{' '}
                        <span className="font-semibold text-text">
                          {pkg.numberOfDays} Days
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-text-muted">Available year-round</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-text-muted">
                        {pkg.locations?.length || 0} destinations
                      </span>
                    </div>
                  </div>
    
                  <Link
                    href="/#contact"
                    className="w-full py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold flex items-center justify-center gap-2 transition-colors mb-3">
                    
                    Book This Tour
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+94771234567"
                    className="w-full py-4 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary font-semibold flex items-center justify-center gap-2 transition-colors">
                    
                    <Phone className="w-4 h-4" />
                    Call to Enquire
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>);
    
    }
