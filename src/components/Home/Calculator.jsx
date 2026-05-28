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
import toast from 'react-hot-toast';

// Mock distances between popular Sri Lankan cities (in km)


export function Calculator() {

  const [rates, setRates] = useState([]);
  const [costData, setCostData] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const [startLoc, setStartLoc] = useState({ lat: 3.179923492694522, lng: 79.88397104877485 });
  const [endLoc, setEndLoc] = useState({ lat: 9.840501633747571, lng: 81.83680543711263 });

  const [distance, setDistance] = useState(null);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleName, setSelectedVehicleName] = useState(null);
  const [totalCost, setTotalCost] = useState(null);


  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form input value bindings
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const [costLoading, setCostLoading] = useState(false);

  // Calculate distance when locations change
  useEffect(() => {
    if (!isCalculated) {
      fetchRates();

    }
  }, []);

  const fetchRates = async () => {
    try {
      setIsCalculated(false);
      const response = await api.get('/rates');
      setRates(response.data);

      toast.success('Rates updated successfully!');
    } catch (error) {
      toast.error('Something went wrong !');
      console.error('Error fetching rates:', error);
    }
  }

  const calculateCost = async () => {
    try {
      setCostLoading(true);

      const response = await api.post('/cal', {
        startCoords: startLoc,
        endCoords: endLoc
      });
      toast.success('Distance calculated successfully!');
      setCostData(response.data);
      setIsCalculated(true)
      setCostLoading(false);
    } catch (error) {
      toast.error('Something went wrong!');
      console.error('Error calculating distance:', error);
      setCostLoading(false);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      if(!isCalculated){
        toast.error('Please calculate the cost before submitting your inquiry.');
        return;
      }

      if(!startLoc || !endLoc){
        toast.error('Please enter both start and end locations.');
        return;
      }

      if(!selectedVehicle){
        toast.error('Please select a vehicle type before submitting your inquiry.');
        return;
      }

      const response = await api.post("inquery/add",{
        startCoords : startLoc,
        endCoords : endLoc,
        rateId : selectedVehicle,
        contact: phone,
        fullName: fullName,
        date: travelDate,
        time: pickupTime
      })

      toast.success('Inquiry sent successfully! We will contact you soon.');


    } catch (error) {
      toast.error('Something went wrong!');
      console.error('Error submitting inquiry:', error);
    }
    
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


                    {/* Calculate Button */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={calculateCost}
                        className="w-full cursor-pointer
                         inline-flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm transition"
                        
                      >
                        {costLoading ? 'Calculating...' : 'Calculate'}
                      </button>
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
                    {
                      !isCalculated ? rates.map((rate) => (
                        <div onClick={()=>{
                          setSelectedVehicle(rate._id)
                        }} className={`p-4  cursor-pointer
                        rounded-xl border text-left transition-all ${selectedVehicle === rate._id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'} shadow-sm`}>
                          <div className="font-semibold text-sm text-slate-800">{rate.vehicleType}</div>

                          <div className="text-xs font-semibold text-emerald-600 mt-4 pt-2 border-t border-gray-100 w-full">
                            Rs {rate.priceperkm}/km
                          </div>
                        </div>
                      )) : costData.calculatedCosts.map((cost) => (
                        <div onClick={()=>{

                          setSelectedVehicle(cost.id)
                          setSelectedVehicleName(cost.vehicleType)
                          setTotalCost(cost.cost)
                          toast.success(`Selected ${selectedVehicleName} for your trip!`)
                        }} className={`p-4 rounded-xl border text-left transition-all ${selectedVehicle === cost.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'} cursor-pointer hover:bg-gray-50 shadow-sm`}>
                          <div className="font-semibold text-sm text-slate-800">{cost.vehicleType}</div>

                          
                          <div className="text-xs font-semibold text-emerald-600 mt-4 pt-2 border-t border-gray-100 w-full">
                           Cost:  Rs {cost.cost}
                          </div>
                        </div>
                      ))
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
                      {costData ? `${costData.distanceKm} km` : '--'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-6 border-b border-white/10">
                    <span className="text-white/60">Vehicle Type</span>
                    <span className="font-semibold text-right">
                      {costData ? selectedVehicleName : '--'}
                      <br />
                     
                    </span>
                  </div>

                  <div className="pt-4">
                    <span className="text-white/60 block mb-2">Estimated Total</span>
                    <div className="text-4xl font-bold text-emerald-400">
                      {costData ? `Rs ${totalCost}` : '--'}
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