import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(localStorage.getItem('role') === 'admin');
  }, [location]);

  if (location.pathname === '/login') return null;

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/admin/destinations', label: 'Destinations' },
    { to: '/admin/tours', label: 'Tours' },
    { to: '/admin/gallery', label: 'Gallery' },
    { to: '/admin/vehicles', label: 'Vehicles' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    navigate('/');
  };

  const getLinkClass = (to) => {
    const isActive = location.pathname === to;
    return `font-sans font-medium relative pb-[2px] block max-md:py-3.5 max-md:px-6 max-md:text-[15px] text-sm transition-colors duration-200 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:rounded-sm after:transition-all after:duration-250 ${
      isActive 
        ? 'text-primary after:bg-accent after:w-full' 
        : 'text-gray-600 hover:text-primary after:bg-accent after:w-0 hover:after:w-full'
    }`;
  };

  return (

    <header className="top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/[0.07]">
    <div className="max-w-[1200px] mx-auto px-6 h-[68px] flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="font-playfair text-[22px] text-primary no-underline shrink-0 select-none">
          <img src="/public/images/udawalawe_tours_hq(2).png" alt="Lanka Tours" className="h-20 w-auto object-contain" />
        </Link>

        {/* Nav links */}
        <ul className={`m-0 p-0 flex list-none gap-7 transition-all duration-300 max-md:w-full ${
          menuOpen 
            ? 'flex absolute top-[68px] left-0 right-0 bg-white flex-col gap-0 border-b border-black/[0.08] py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]' 
            : 'hidden md:flex md:flex-row'
        }`}>
          {publicLinks.map(link => (
            <li key={link.to} className="max-md:w-full">
              <Link
                to={link.to}
                className={getLinkClass(link.to)}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {isAdmin ? (
            <button 
              className="font-sans text-[13px] font-medium bg-transparent text-red-600 border border-red-600 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-red-50"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/contact" 
              className="font-sans text-[13px] font-medium bg-accent hover:bg-accent-hover text-white px-[18px] py-[9px] rounded-lg no-underline whitespace-nowrap transition-all duration-200 hover:-translate-y-[1px] max-md:hidden"
            >
              Calculate Your Trip
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="hidden max-md:flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1 outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-[2px] bg-primary rounded-sm transition-all duration-250 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-6 h-[2px] bg-primary rounded-sm transition-all duration-250 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-primary rounded-sm transition-all duration-250 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
