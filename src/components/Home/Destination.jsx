"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 15 
    } 
  }
};

export function Destinations({ showViewAll = true }) {
  const [allDestinations, setAllDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/destination/all");
      setAllDestinations(response.data.data || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast.error('Something went wrong fetching destinations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  if (isLoading && allDestinations.length === 0) {
    return (
      <div className="text-center py-24 text-lg font-medium bg-gray-50">
        Loading Destinations...
      </div>
    );
  }

  return (
    <section id="destinations" className="py-24 bg-surface bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-accent text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
              Explore Sri Lanka
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text text-slate-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-text-muted text-slate-600 text-lg">
              From ancient ruins to pristine beaches, discover the most
              breathtaking locations our beautiful island has to offer.
            </p>
          </div>
          {showViewAll && (
            <Link href="/destinations" className="inline-flex items-center gap-2 text-primary text-blue-600 font-semibold hover:text-emerald-600 transition-colors group no-underline">
              View All Destinations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6"
        >
          {allDestinations.slice().reverse().slice(0, 5).map((dest, index) => {
            // Assign varying layout grid spans dynamically for the top 5 spots
            const colSpan = index === 0 
              ? 'md:col-span-2 md:row-span-2' 
              : 'md:col-span-1 md:row-span-1';

            return (
              <motion.div
                key={dest._id}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer w-full h-full shadow-md hover:shadow-2xl transition-all duration-300 ${colSpan}`}
              >
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-white/80 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}