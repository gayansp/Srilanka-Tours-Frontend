import Link from 'next/link';

const Footer = () => {
  const quickLinks = [
    { to: '/',             label: 'Home' },
    { to: '/tours',        label: 'Travel Packages' },
    { to: '/destinations', label: 'Destinations' },
    { to: '/gallery',      label: 'Gallery' },
    { to: '/about',        label: 'About Us' },
    { to: '/contact',      label: 'Contact Us' },
  ];

  const destinations = [
    'Udawalawa National Park',
    'Yala National Park',
    'Sigiriya Rock',
    'Ella & Hill Country',
    'Anuradhapura',
  ];

  return (
    <footer>

      {/* ── Footer Main ── */}
      <div className="bg-[#0a1a28] px-6 pt-14 pb-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/">
              <img
                src="/images/udawalawe_tours_hq(2).png"
                alt="Lanka Tours"
                className="h-12 mb-4"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Your premier safari partner in Sri Lanka. Experience the wonder of
              Sri Lanka's national parks with our expert guides and unforgettable
              adventures.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {['f', 'in', 'tw', '▶'].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all text-xs"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-white/50 hover:text-[#d97706] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Popular Destinations</h4>
            <ul className="flex flex-col gap-3">
              {destinations.map((d, i) => (
                <li key={i}>
                  <Link
                    href="/destinations"
                    className="text-white/50 hover:text-[#d97706] text-sm transition-colors"
                  >
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <span>📍</span> Udawalawa, Sri Lanka
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <span>📞</span> +94 70 600 0344
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <span>✉️</span>srilankatours@gmail.com
              </li>
              <li>
                <a
                  href="https://wa.me/94706000344"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-[#25d366] text-sm transition-colors"
                >
                  <span>💬</span> WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © 2026 Lanka Tours (PVT) Ltd. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
