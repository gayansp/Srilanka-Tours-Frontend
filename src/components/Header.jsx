import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(localStorage.getItem('role') === 'admin');
  }, [location]); // route change වෙද්දී recheck කරනවා

  // Admin pages වලට Header show කරන්නේ නෑ

  if (location.pathname === '/login') return null;

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/destinations', label: 'Destinations' },
    { to: '/tours', label: 'Tours' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-inner">

        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src="/public/images/udawalawe_tours_hq(2).png" alt="Lanka Tours" className="logo-img" />
        </Link>

        {/* Nav links */}
        <ul className={`header-links ${menuOpen ? 'open' : ''}`}>
          {publicLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Admin logged in නම් dashboard link */}
          {isAdmin && (
            <li>
              <Link
                to="/admin"
                className="admin-link"
                onClick={() => setMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Right side */}
        <div className="header-right">
          {isAdmin ? (
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/contact" className="btn-cta">
              Calculate Your Trip
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
