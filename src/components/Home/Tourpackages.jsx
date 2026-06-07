import React, { useEffect, useState } from "react";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const PACKAGES = [
  {
    id: 1,
    title: "Cultural Triangle Tour",
    duration: "5 Days / 4 Nights",
    price: "$450",
    image: "/images/kandy.jpg",
    inclusions: [
      "Sigiriya Rock Fortress",
      "Dambulla Cave Temple",
      "Polonnaruwa Ruins",
      "Kandy Temple of Tooth",
    ],
    popular: false,
  },
  {
    id: 2,
    title: "Hill Country & Beach",
    duration: "7 Days / 6 Nights",
    price: "$680",
    image: "/images/mir.jpg",
    inclusions: [
      "Scenic Train Ride",
      "Tea Plantation Tour",
      "Ella Rock Hike",
      "Mirissa Beach Stay",
    ],
    popular: true,
  },
  {
    id: 3,
    title: "Wildlife Safari Explorer",
    duration: "3 Days / 2 Nights",
    price: "$320",
    image: "/images/c8.jpg",
    inclusions: [
      "Yala National Park",
      "Udawalawe Safari",
      "Elephant Transit Home",
      "Jungle Camping",
    ],
    popular: false,
  },
];

export const TourPackages = () => {

  const [allTourpackages, setAllTourpackages] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const fetchTourpackages = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await api.get("tourpackages/all");
      console.log("Response:", response.data);
      setAllTourpackages(response.data.date);
    } catch (error) {
      console.error('Error fetching tour packages:', error);
      toast.error('Something went wrong');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchTourpackages();
    }, []);

  return (
    <section id="tours" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold uppercase text-sm">
            Curated Experiences
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">
            Travel Packages
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-lg">
            Carefully crafted itineraries that showcase the best of Sri Lanka.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 flex flex-col md:grid-cols-3 gap-8">
          {allTourpackages.map((pkg, index) => (
            <div
              key={pkg._id}
              className={`bg-white rounded-3xl overflow-hidden shadow-md border flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                pkg.popular
                  ? "border-emerald-500 ring-2 ring-emerald-200"
                  : "border-gray-100"
              }`}
            >
              {/* Image */}
              <div className="relative h-64">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />

                {pkg.popular && (
                  <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-xl flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-600" />
                  {pkg.title}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="h-[150px] overflow-y-auto">
                  <p className="text-base font-normal text-slate-700 leading-relaxed mr-3 text-justify">
                    {pkg.details}
                  </p>
                </div>

                <div className="text-2xl font-bold text-green-800 mt-4">
                  {pkg.pricePerPerson}
                  <span className="text-sm font-normal text-slate-500">
                    {" "}
                    / person
                  </span>
                </div>


                {/* Button */}
                <button
                  onClick={() => navigate(`/tour-details/${pkg._id}`)}
                  className={`mt-6 w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                    pkg.popular
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-900 text-white hover:bg-green-800"
                  }`}
                >
                  Book Package
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
