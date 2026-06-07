import React, { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { FadeIn } from "./FadeIn";
import axios from "axios";
import api from "../../api/axios";
import toast from "react-hot-toast";


export const Destinations = () => {

  const [allDestinations, setAllDestinations] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchDestinations = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await api.get("destination/all");
      console.log("Response:", response.data);
      setAllDestinations(response.data.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast.error('Somthing went wrong');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchDestinations();
    }, []);

  return (
    <section id="destinations" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm mb-2 block">
                Explore Sri Lanka
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Popular Destinations
              </h2>

              <p className="text-gray-600 text-lg">
                From ancient ruins to pristine beaches, discover the most
                breathtaking locations our beautiful island has to offer.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-orange-500 transition-colors">
              View All Destinations
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allDestinations.map((dest, index) => (
            <FadeIn key={dest._id} delay={index * 0.1}>
              <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {dest.name}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    {dest.description}
                  </p>

                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
