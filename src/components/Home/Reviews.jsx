import React, { useState } from 'react';

export function Reviews() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const recentReviews = [
    "Great taxi service in Sri Lanka",
    "Fox family meeting in Sri Lanka",
    "Amazing Tour Guide",
    "R Jay represents the absolute BEST of...",
    "Awesome!! The best in the country."
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating before continuing.");
      return;
    }
    console.log("Submitting Review Data:", { rating, reviewText });
    // Handle submission API logic here
  };

  return (
    <section className="bg-white py-16 px-6 font-sans w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section Banner Elements */}
        <div className="text-center mb-16 relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-12 h-[2px] bg-green-400" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-green-500">
              Tripadvisor
            </span>
            <div className="w-12 h-[2px] bg-green-400" />
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
                <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-3.5 6a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm7 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8.5 9.5c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm7 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
              </svg>
              <span className="font-bold text-sm text-slate-800 tracking-tight">Tripadvisor</span>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-900 border-b-2 border-slate-900 inline-block pb-0.5 mb-2">
                Udawalawa Tours and Safari – Private Car Tours in Sri Lanka
              </h3>
              <div className="flex gap-4 text-xs font-semibold text-slate-600 mt-2">
                <a href="https://www.tripadvisor.com/Attraction_Review-g3577009-d34293796-Reviews-Udawalawa_Tours_and_Safari_Private_Car_Tours_in_Sri_Lanka-Udawalawa_Sabaragamuw.html" className="hover:text-[#00aa6c] transition-colors underline decoration-slate-400">Read reviews</a>
                <span className="text-slate-300">|</span>
                <a href="https://www.tripadvisor.com/UserReviewEdit-g3577009-d34293796-Udawalawa_Tours_and_Safari_Private_Car_Tours_in_Sri_Lanka-Udawalawa_Sabaragamuwa_Province.html" className="hover:text-[#00aa6c] transition-colors underline decoration-slate-400">Write a review</a>
              </div>
            </div>
          </div>

          {/* Column 2: Historical Static Aggregations Metrics */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tripadvisor Traveler Rating
            </h4>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <div 
                    key={idx} 
                    className="w-4 h-4 rounded-full bg-[#00aa6c]" 
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">15 reviews</span>
            </div>
          </div>

          {/* Column 3: Live Feed Snippets Block */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Recent Traveler Reviews
            </h4>
            <ul className="space-y-2">
              {recentReviews.map((review, i) => (
                <li 
                  key={i} 
                  className="text-sm font-medium text-slate-700 italic border-l-2 border-slate-200 pl-3 leading-relaxed"
                >
                  "{review}"
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Functional Interactive Assessment Matrix */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
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
                        className="p-0 border-none bg-transparent cursor-pointer transition-transform duration-150 active:scale-90"
                      >
                        <div 
                          className={`w-5 h-5 rounded-full border-2 transition-all duration-150 ${
                            isFilled 
                              ? 'bg-[#00aa6c] border-[#00aa6c]' 
                              : 'bg-white border-[#00aa6c]'
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

            {/* Input Form Module */}
            <div className="relative">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Title your review - Describe your stay in one sentence or less."
                maxLength={180}
                className="w-full min-h-[110px] p-3 text-sm text-slate-800 placeholder-slate-400 bg-white border border-slate-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#004f32] focus:border-[#004f32] resize-none leading-relaxed shadow-inner"
              />
            </div>

            {/* Continuous Submit Control Anchor Action */}
            <button
              type="submit"
              className="bg-[#002217] hover:bg-[#003322] text-white text-sm font-bold px-6 py-2.5 rounded-md shadow transition-colors duration-150 active:scale-[0.99]"
            >
              Continue
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}