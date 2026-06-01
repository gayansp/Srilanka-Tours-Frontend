import React, { useState } from 'react';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

export function Reviews() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const recentReviews = [
    "Excellent smooth comfortable ride!",
    "Booked a car to take me to and from Colombo....",
    "Amazing Tour GuideI had a very comfortable ride from Hiriketiya to Udawalawe Nationalpark!",
    "Used this driver three times. Always on time, always comfortable. Thanks, we'll get back to you sometime!",
    
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating before continuing.");
      return;
    }
    
    toast.success("Opening TripAdvisor... Please write your review there!");
    
    const tripAdvisorUrl = "https://www.tripadvisor.com/UserReviewEdit-g3577009-d34293796-Udawalawa_Tours_and_Safari_Private_Car_Tours_in_Sri_Lanka-Udawalawa_Sabaragamuwa_Province.html";
    
    setTimeout(() => {
      window.open(tripAdvisorUrl, '_blank', 'noopener,noreferrer');
    }, 1200);
  };

  return (
    <section className="bg-white py-24 px-6 font-sans w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section Banner Elements */}
        <div className="text-center mb-16 relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-12 h-[2px] bg-emerald-500" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-600">
              Tripadvisor
            </span>
            <div className="w-12 h-[2px] bg-emerald-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0a2240] tracking-tight uppercase">
            Write Your Experience
          </h2>
        </div>

        {/* Core Multi-Column Feedback Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start pt-6">
          
          {/* Column 1: Brand Directory Profile Card */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* Tripadvisor Clean SVG Path Vector Representation */}
              <svg className="w-6 h-6 text-[#00aa6c] fill-current" viewBox="0 0 24 24">
                <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z" />
              </svg>
              <span className="font-bold text-sm text-slate-800 tracking-tight">Tripadvisor</span>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-slate-900 border-b-2 border-emerald-500 inline-block pb-1 mb-3 leading-snug">
                Udawalawa Tours and Safari – Private Car Tours in Sri Lanka
              </h3>
              <div className="flex gap-4 text-xs font-semibold text-slate-600 mt-2">
                <a href="https://www.tripadvisor.com/Attraction_Review-g3577009-d34293796-Reviews-Udawalawa_Tours_and_Safari_Private_Car_Tours_in_Sri_Lanka-Udawalawa_Sabaragamuw.html" target="_blank" rel="noopener noreferrer" className="hover:text-[#00aa6c] transition-colors underline decoration-slate-400">Read reviews</a>
                <span className="text-slate-300">|</span>
                <a href="https://www.tripadvisor.com/UserReviewEdit-g3577009-d34293796-Udawalawa_Tours_and_Safari_Private_Car_Tours_in_Sri_Lanka-Udawalawa_Sabaragamuwa_Province.html" target="_blank" rel="noopener noreferrer" className="hover:text-[#00aa6c] transition-colors underline decoration-slate-400">Write a review</a>
              </div>
            </div>
          </div>

          {/* Column 2: Historical Static Aggregations Metrics */}
          <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100/50">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tripadvisor Traveler Rating
            </h4>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <div 
                    key={idx} 
                    className="w-4 h-4 rounded-full bg-[#00aa6c] border border-[#00aa6c]" 
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-800">5.0</span>
            </div>
            <p className="text-xs text-slate-500">Based on 5 traveler reviews</p>
          </div>

          {/* Column 3: Live Feed Snippets Block */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Recent Traveler Reviews
            </h4>
            <ul className="space-y-3">
              {recentReviews.map((review, i) => (
                <li 
                  key={i} 
                  className="text-sm font-medium text-slate-700 italic border-l-2 border-emerald-500 pl-3 leading-relaxed py-0.5"
                >
                  "{review}"
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Functional Interactive Assessment Matrix */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col justify-between h-full min-h-[220px]">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Your Rating
              </span>
              <div className="flex items-center gap-2">
                {/* Interactive Dynamic Star Grid Element Nodes */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = starValue <= (hoverRating || rating);
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0 border-none bg-transparent cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors duration-150 ${
                            isFilled 
                              ? 'text-amber-500 fill-amber-500' 
                              : 'text-slate-300 hover:text-amber-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  (Click to rate)
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
              Select your rating above and click below to write your review directly on our TripAdvisor form.
            </div>

            {/* Continuous Submit Control Action */}
            <button
              type="submit"
              className="w-full bg-[#1a3a2a] hover:bg-emerald-800 text-white text-sm font-bold py-3 rounded-lg shadow-sm transition-colors duration-150 active:scale-[0.98]"
            >
              Write Review on TripAdvisor
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}