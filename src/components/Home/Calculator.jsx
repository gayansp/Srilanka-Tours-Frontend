"use client";

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
import api from '../../api/axios';
import ErrorPage from '../../views/ErrorPage';
import { BeatLoader } from 'react-spinners';



  

export function Calculator() {


  const [startLocation, setStartLoc] = useState('');
  const [endLocation, setEndLoc] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError,setIsError] = useState(false);

const vehicleTypes = [
    { name: "Car", image: "/images/car.png" },
    { name: "Van", image: "/images/van.png" },
    { name: "SUV", image: "/images/SUV.png" },
  ]

// Mock distances between popular Sri Lankan cities (in km)
const fetchVehicles = async () => {
    try {
        setIsLoading(true);
        const response = await api.get("vehicles/get");
        setVehicles(response.data.vehicles);

    } catch (error) {
        console.error("Error fetching vehicles:", error);
        setIsError(true);
    } finally {
        setIsLoading(false);
    }
  }
  

  const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const fullMessage = `
 *New Trip Inquiry*

 - Start Location: ${startLocation}
 - End Location: ${endLocation}
 - Vehicle: ${vehicleName}

 - Name: ${fullName}
 - Contact: ${contact}

 - Date: ${date}
 - Time: ${time}
  `;

  const whatsappUrl = `https://wa.me/94706000344?text=${encodeURIComponent(fullMessage)}`;

  setTimeout(() => {
    setIsSubmitting(false);
    window.open(whatsappUrl, "_blank");
  }, 600);
};

  useEffect(() => {
    fetchVehicles();
  }, []);

  if(isError){
    return <ErrorPage/>
  }

  if(isLoading){
    return <div className="mt-16 flex items-center justify-center h-full">
        <BeatLoader color="red" />
    </div>
  }

  return (
    <section id="calculator" className="py-24 bg-white relative">
      {/* Light blue shape element completely removed here to clear background space */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Animated Header Component Container */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Sri Lanka Tour & Driver Cost Calculator
          </h2>
          <p className="text-cyan-800 max-w-2xl mx-auto text-lg">
            Get an instant budget estimate for your custom Sri Lanka tours. Plan your Ella travels,
            Udawalawa tours, or full island private transport service with SL Travels today.
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
                    
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {
                      vehicles.map((vehicle) => {
                        const vType = vehicleTypes.find(type => type.name === vehicle.type);
                        return (
                          <label key={vehicle.id || vehicle.name} className="cursor-pointer" >
                            <input onChange={() => setVehicleName(vehicle.name)} type="radio" name="vehicle" value={vehicle.name} className="sr-only" />
                            <div className={`flex flex-col items-center gap-3 p-4 ${vehicle.name == vehicleName ? "bg-red-100" : "bg-white"} border ${vehicle.name == vehicleName ? "border-red-600" : "border-gray-100"} rounded-2xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 hover:scale-[1.02]`}>
                              {vType?.image ? (
                                <img className="w-12 h-12 object-contain" src={vType.image} alt={vehicle.type} />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-semibold">{vehicle.name.charAt(0)}</div>
                              )}
                              <div className="text-sm font-semibold text-slate-700">{vehicle.name}</div>
                              <div className="text-xs text-slate-400">{vType?.description || vehicle.type}</div>
                            </div>
                          </label>
                        )
                      })
                    }
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
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
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
                    {isSubmitting ? <BeatLoader size={8} color="white" /> : 'Send'}
                    {!isSubmitting && <Send className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            </div>

            {/* Dark Green Summary Section Sidebar */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#0f2a22] via-[#112d24] to-[#0b201a] text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden border border-white/10 shadow-2xl">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative z-10">
                  <div className="inli  ne-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 mb-6 w-fit">
                    Trip Summary
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-2 font-medium">
                        Start Location
                      </div>
                      <div className="text-base md:text-lg font-semibold text-white break-words leading-snug">
                        {startLocation}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-2 font-medium">
                        End Location
                      </div>
                      <div className="text-base md:text-lg font-semibold text-white break-words leading-snug">
                        {endLocation}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/25 bg-gradient-to-br from-emerald-400/15 to-emerald-500/5 px-5 py-4 shadow-sm backdrop-blur-sm">
                      <span className="text-[11px] uppercase tracking-[0.28em] text-emerald-200/80 block mb-2 font-medium">Vehicle Type</span>
                      <div className="text-xl md:text-2xl font-bold text-emerald-300 break-words leading-tight">
                        {vehicleName}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                        <span className="text-[11px] uppercase tracking-[0.28em] text-white/50 block mb-2 font-medium">Full Name</span>
                        <div className="text-base font-semibold text-white break-words leading-snug">
                          {fullName}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                        <span className="text-[11px] uppercase tracking-[0.28em] text-white/50 block mb-2 font-medium">Contact</span>
                        <div className="text-base font-semibold text-white break-words leading-snug">
                          {contact}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                        <span className="text-[11px] uppercase tracking-[0.28em] text-white/50 block mb-2 font-medium">Travel Date</span>
                        <div className="text-base font-semibold text-white break-words leading-snug">
                          {date}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                        <span className="text-[11px] uppercase tracking-[0.28em] text-white/50 block mb-2 font-medium">Pickup Time</span>
                        <div className="text-base font-semibold text-white break-words leading-snug">
                          {time}
                        </div>
                      </div>
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