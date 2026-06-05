import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export function Contactus() {
  const handleWhatsApp = () => {
    const phoneNumber = '94706000344'; // Replace with your live WhatsApp business number
    const message = encodeURIComponent('Hi Udawala Tours! I am interested in planning a Sri Lankan safari experience.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@udawalators.lk?subject=Safari Trip Inquiry';
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-900 py-20 text-white">
      {/* Background Image Asset with Rich Dark Overlay Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="public/images/MinneriyaNationalParkPrivateJeepElephant’sSafari.jpg"
          alt="Sri Lankan Safari Bus Background"
          className="h-full w-full object-cover opacity-3000 transition-transform duration-1000 select-none scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f1a]/95 via-[#112d24]/90 to-[#12362b]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Main Header Statements */}
        <h2 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-3xl leading-tight">
          Ready to Start Your <span className="text-[#f19c49]">Adventure?</span>
        </h2>
        
        <p className="text-gray-300 text-base md:text-lg max-w-2xl font-light mb-10 leading-relaxed">
          Get in touch with us today and let our expert team help you plan the 
          perfect Sri Lankan safari experience.
        </p>

        {/* Action Controls Group */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
          {/* Accent Coral Contact Controller */}
          <button
            onClick={handleEmail}
            className="flex items-center justify-center gap-2 bg-[#e07e43] hover:bg-[#cf6f34] text-white font-medium px-8 py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-[0.99]"
          >
            <Mail className="w-5 h-5 fill-white/10" />
            Contact Us
          </button>

          {/* Core Green WhatsApp Controller */}
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 bg-[#4cb091] hover:bg-[#3ea082] text-white font-medium px-8 py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-[0.99]"
          >
            {/* Custom SVG Path for authentic WhatsApp interface logo representation */}
            <svg 
              className="w-5 h-5 fill-white" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.99 0c3.196.001 6.2 1.242 8.461 3.499 2.261 2.258 3.501 5.259 3.5 8.457-.003 6.657-5.34 12-11.932 12-2.01 0-3.99-.507-5.747-1.474L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.975 14.067 1.053 11.99 1.052c-5.444 0-9.866 4.372-9.87 9.802 0 1.714.475 3.393 1.374 4.869l-1.011 3.689 3.784-1.006z" />
            </svg>
            WhatsApp Us
          </button>
        </div>

        {/* Global Structural Horizontal Divider */}
        <div className="w-full max-w-4xl h-[1px] bg-white/10 mb-8" />

        {/* Metadata Grid Inline Footer Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs md:text-sm font-medium text-gray-300">
          <a href="tel:+94706000344" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-4 h-4 text-[#f19c49] fill-[#f19c49]/20" />
            +94 70 600 0344
          </a>
          
          <a href="mailto:srilankatours@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-4 h-4 text-[#f19c49]" />
            srilankatours@gmail.com
          </a>
          
          <div className="flex items-center gap-2 select-none">
            <MapPin className="w-4 h-4 text-[#f19c49]" />
            Udawalawe, Sri Lanka
          </div>
        </div>
      </div>
    </section>
  );
}