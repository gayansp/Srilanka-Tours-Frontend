const AdminDash = () => {
  const stats = [
    { icon: '📍', label: 'Destinations', value: '24' },
    { icon: '🧳', label: 'Tour Packages', value: '12' },
    { icon: '🖼️', label: 'Gallery Images', value: '86' },
    { icon: '💰', label: 'Rate Cards',    value: '3'  },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-16">

      {/* Welcome card */}
      <div className="bg-gradient-to-br from-[#0f2535] to-[#1a4060] rounded-3xl px-10 py-12 text-center max-w-2xl w-full shadow-2xl mb-8">
        <div className="text-5xl mb-5">🌿</div>
        <p className="text-[#d97706] text-xs uppercase tracking-widest mb-3">Admin Panel</p>
        <h1 className="text-white font-serif text-3xl md:text-4xl font-bold leading-tight mb-3">
          Welcome to Admin Dashboard
        </h1>
        <h2 className="text-[#d97706] font-serif text-xl md:text-2xl mb-5">
          Udawalawa Safari & Tours
        </h2>
        <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
          Use the navigation bar above to manage your destinations, tours,
          gallery, packages and rates.
        </p>
      </div>

      

    </div>
  );
};

export default AdminDash;
