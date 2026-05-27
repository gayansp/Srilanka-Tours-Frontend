import { useEffect, useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Send,
  Car,
  Bus
} from 'lucide-react';

// Mock distances between popular Sri Lankan cities (in km)
const DISTANCE_MAP = {
  'colombo-kandy': 115,
  'kandy-colombo': 115,
  'colombo-galle': 125,
  'galle-colombo': 125,
  'kandy-ella': 140,
  'ella-kandy': 140,
  'colombo-ella': 200,
  'ella-colombo': 200,
  'colombo-sigiriya': 175,
  'sigiriya-colombo': 175,
  'kandy-sigiriya': 90,
  'sigiriya-kandy': 90,
  'galle-mirissa': 35,
  'mirissa-galle': 35,
  'colombo-airport': 35,
  'airport-colombo': 35
};

const VEHICLES = [
  {
    id: 'sedan',
    name: 'Sedan Car',
    icon: Car,
    capacity: '3 Pax',
    rate: 120,
    desc: 'Comfortable'
  },
  {
    id: 'suv',
    name: 'SUV / Van',
    icon: Bus,
    capacity: '6 Pax',
    rate: 180,
    desc: 'Family size'
  },
  {
    id: 'minibus',
    name: 'Mini Bus',
    icon: Bus,
    capacity: '15 Pax',
    rate: 250,
    desc: 'Small groups'
  }
];

export function Calculator() {
  const [startLoc, setStartLoc] = useState('');
  const [endLoc, setEndLoc] = useState('');
  const [distance, setDistance] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLES[1]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form input value bindings
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  // Calculate distance when locations change
  useEffect(() => {
    if (startLoc.length > 2 && endLoc.length > 2) {
      const key = `${startLoc.toLowerCase().trim()}-${endLoc.toLowerCase().trim()}`;
      if (DISTANCE_MAP[key]) {
        setDistance(DISTANCE_MAP[key]);
      } else {
        // Fallback pseudo-random stable distance
        setDistance((startLoc.length * endLoc.length * 13) % 300 + 20);
      }
    } else {
      setDistance(null);
    }
  }, [startLoc, endLoc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      
      const estimatedPrice = distance ? distance * selectedVehicle.rate : 0;
      const whatsappBusinessNumber = '94771234567'; // Update with your actual WhatsApp contact number

      const textMessage = 
        `*NEW TRIP BOOKING INQUIRY*\n\n` +
        `👤 *Customer Name:* ${fullName}\n` +
        `📱 *Contact:* ${phone}\n\n` +
        `📍 *Start Location:* ${startLoc}\n` +
        `🏁 *End Location:* ${endLoc}\n` +
        `🛣️ *Distance:* ${distance ? `${distance} KM` : 'Pending'}\n\n` +
        `🚗 *Vehicle Type:* ${selectedVehicle.name}\n` +
        `📅 *Schedule:* ${travelDate} @ ${pickupTime}\n\n` +
        `💰 *Estimated Total:* Rs. ${estimatedPrice.toLocaleString()}`;

      window.open(`https://wa.me/${whatsappBusinessNumber}?text=${encodeURIComponent(textMessage)}`, '_blank');
      alert('Inquiry Sent Successfully! Your parameters have been transferred to chat.');
    }, 1000);
  };

  const estimatedPrice = distance ? distance * selectedVehicle.rate : 0;

  return (
    <section id="calculator" className="py-24 bg-white relative">
      {/* Light blue shape element completely removed here to clear background space */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Animated Header Component Container */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Calculate Your Trip
          </h2>
          <p className="text-cyan-800 max-w-2xl mx-auto text-lg">
            Get an instant estimate for your journey across Sri Lanka.
            Choose your route, pick a vehicle, and let's get started.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-emerald-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Form Section Column - Changed bg-white to soft bg-slate-50 */}
            <div className="lg:col-span-8 bg-slate-50 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Locations Routing Field Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Start Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Colombo Airport"
                        value={startLoc}
                        onChange={(e) => setStartLoc(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all outline-none text-slate-800 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Desktop connector vector layout asset */}
                  <div className="hidden md:block absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gray-300" />

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      End Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kandy"
                        value={endLoc}
                        onChange={(e) => setEndLoc(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all outline-none text-slate-800 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Tier Fleet Selection Selector Array */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                    <span>Select Vehicle</span>
                    <span className="text-xs font-normal text-slate-500">
                      Rates are per km and may vary based on exact route
                    </span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {VEHICLES.map((vehicle) => {
                      const Icon = vehicle.icon;
                      const isSelected = selectedVehicle.id === vehicle.id;

                      return (
                        <button
                          key={vehicle.id}
                          type="button"
                          onClick={() => setSelectedVehicle(vehicle)}
                          className={`p-4 rounded-xl border text-left transition-all bg-white shadow-sm flex flex-col justify-between ${
                            isSelected
                              ? 'border-emerald-600 ring-2 ring-emerald-600/10 bg-emerald-50/10'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div>
                            <Icon className={`w-6 h-6 mb-3 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                            <div className="font-semibold text-sm text-slate-800">{vehicle.name}</div>
                            <div className="text-xs text-slate-500 mt-1">{vehicle.capacity}</div>
                          </div>
                          <div className="text-xs font-semibold text-emerald-600 mt-4 pt-2 border-t border-gray-100 w-full">
                            Rs {vehicle.rate}/km
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Secure Client Parameters Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200/60">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 outline-none text-slate-800 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+94 77 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 outline-none text-slate-800 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 outline-none text-slate-800 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Pickup Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="time"
                        required
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 outline-none text-slate-800 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm"
                  >
                    {isSubmitting ? 'Processing...' : 'Send Inquiry Via WhatsApp'}
                    {!isSubmitting && <Send className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            </div>

            {/* Dark Green Summary Section Sidebar */}
            <div className="lg:col-span-4 bg-[#112d24] text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-bold mb-8">
                  Trip Summary
                </h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-6 border-b border-white/10">
                    <span className="text-white/60">Estimated Distance</span>
                    <span className="text-2xl font-bold">
                      {distance ? `${distance} km` : '--'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-6 border-b border-white/10">
                    <span className="text-white/60">Vehicle Type</span>
                    <span className="font-semibold text-right">
                      {selectedVehicle.name}
                      <br />
                      <span className="text-sm text-emerald-400 font-normal">
                        Rs {selectedVehicle.rate}/km
                      </span>
                    </span>
                  </div>

                  <div className="pt-4">
                    <span className="text-white/60 block mb-2">Estimated Total</span>
                    <div className="text-4xl font-bold text-emerald-400">
                      {estimatedPrice ? `Rs ${estimatedPrice.toLocaleString()}` : '--'}
                    </div>

                    <p className="text-xs text-white/40 mt-6 leading-relaxed">
                      * This is an estimated cost based on standard routes. Final price may vary based on exact pickup/drop-off locations and detours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}