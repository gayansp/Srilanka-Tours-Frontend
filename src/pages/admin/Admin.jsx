import { useEffect, useState } from 'react';

const AdminDash = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative"
      style={{ backgroundImage: "url('/images/mklh.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full flex flex-col items-center mt-15">

        {/* Welcome card */}
        <div
          className={`bg-white/10 backdrop-blur-md rounded-3xl px-10 py-12 text-center max-w-2xl w-full shadow-2xl mb-8 border border-white/20
            transition-all duration-700 ease-out
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <img src="/images/udawalawe_tours_hq(2).png" alt="logo" className="h-16 mx-auto mb-4" />
          <p className="text-[#fafcfe] text-xs uppercase tracking-widest mb-3">Admin Panel</p>
          <h1 className="text-white font-serif text-3xl md:text-4xl font-bold leading-tight mb-3">
            Welcome to Admin Dashboard
          </h1>
          <h2 className="text-[#71d4ff] font-serif text-xl md:text-2xl mb-5">
            Udawalawa Safari & Tours
          </h2>
          <p className="text-red-200 text-sm leading-relaxed max-w-md mx-auto">
            Use the navigation bar above to manage your destinations, tours,
            gallery, packages and rates.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDash;