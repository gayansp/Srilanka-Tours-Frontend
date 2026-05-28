import React, { useState } from 'react';
import { 
  Compass, Plus, Trash2, Edit3, MapPin, 
  Clock, Users, Image as ImageIcon, X, Upload 
} from 'lucide-react';
import { Modal, ConfirmDialog } from '../../components/admin/Model';
import { toast } from 'sonner';

const INITIAL_TOURS = [
  {
    id: 1,
    title: 'Classic Udawalawe Wild Safari National Park',
    days: 1,
    pax: '2 - 6 Players',
    description: 'Venture deep into the marshes and plains of Udawalawe to observe majestic Sri Lankan elephant herds, rare leopards, and specialized water birds in their native habitat.',
    locations: ['Elephant Transit Home', 'Udawalawe Reservoir', 'National Park Safari Trails'],
    images: [
      'https://images.unsplash.com/photo-1580963507577-0348744b8b6e?q=80&w=600',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=600',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600'
    ],
    prices: { standard: 24000, luxury: 38000 }
  },
  {
    id: 2,
    title: 'Scenic Ella Highlands & Mountain Expedition',
    days: 3,
    pax: '1 - 10 Players',
    description: 'Climb through mist-covered tea domains, stand on the historic Nine Arch railway bridge, and scale Little Adams Peak for breathtaking panoramic horizon views.',
    locations: ['Nine Arch Bridge', 'Little Adams Peak', 'Ravana Waterfalls', 'Diyaluma Falls'],
    images: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600',
      'https://images.unsplash.com/photo-1574045564883-911855e71465?q=80&w=600',
      'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600',
      'https://images.unsplash.com/photo-1586526485012-30232537d800?q=80&w=600'
    ],
    prices: { standard: 45000, luxury: 68000 }
  }
];

const EMPTY_FORM = {
  title: '',
  days: 1,
  pax: '',
  description: '',
  locations: [],
  images: ['', '', '', ''], // Holds up to 4 base64 data URLs
  prices: { standard: '', luxury: '' }
};

export default function AdminTours() {
  const [tours, setTours] = useState(INITIAL_TOURS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const [form, setForm] = useState(EMPTY_FORM);
  const [locInput, setLocInput] = useState('');

  const handleOpenCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tour) => {
    setForm({ ...tour });
    setEditingId(tour.id);
    setIsModalOpen(true);
  };

  const addLocationTag = (e) => {
    e.preventDefault();
    if (!locInput.trim()) return;
    setForm({ ...form, locations: [...form.locations, locInput.trim()] });
    setLocInput('');
  };

  const removeLocationTag = (indexToRemove) => {
    setForm({
      ...form,
      locations: form.locations.filter((_, idx) => idx !== indexToRemove)
    });
  };

  // Convert uploaded image file into a local base64 string preview
  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...form.images];
      updatedImages[index] = reader.result; // This stores the local base64 string data
      setForm({ ...form, images: updatedImages });
    };
    reader.readAsDataURL(file);
  };

  const removeImageAt = (index) => {
    const updatedImages = [...form.images];
    updatedImages[index] = '';
    setForm({ ...form, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setTours(tours.map(t => t.id === editingId ? { ...form, id: editingId } : t));
      toast.success('Tour itinerary package revised successfully');
    } else {
      setTours([{ ...form, id: Date.now() }, ...tours]);
      toast.success('Brand new tour expedition published live');
    }
    setIsModalOpen(false);
    setForm(EMPTY_FORM);
  };

  const handleDeleteConfirm = () => {
    setTours(tours.filter(t => t.id !== deleteId));
    toast.success('Tour catalog record removed safely');
    setDeleteId(null);
  };

  return (
    /* ADDED: pt-24 (Top padding) and mt-6 to guarantee it completely clears your sticky admin navbar layout */
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner Control Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#a1cd3a]" /> Tour Package Portfolio Manager
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Publish adventures, adjust pricing tiers, manage itineraries and content displays.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0b222c] hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Tour Package
        </button>
      </div>

      {/* Main Grid View Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            
            {/* Upper Media Display block layout */}
            <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 h-48 shrink-0 relative">
              {tour.images.map((imgUrl, i) => (
                <div key={i} className="h-full w-full overflow-hidden bg-slate-200 border border-white/20 first:col-span-2 first:row-span-2 relative group">
                  {imgUrl ? (
                    <img src={imgUrl} alt="Tour thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                      <ImageIcon className="w-4 h-4 opacity-40" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Quick Spec Counter Overlay Chips */}
              <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                <span className="bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#a1cd3a]" /> {tour.days} {tour.days === 1 ? 'Day' : 'Days'}
                </span>
                <span className="bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#a1cd3a]" /> {tour.pax}
                </span>
              </div>
            </div>

            {/* Middle Main Descriptive Body */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-tight tracking-tight line-clamp-1">{tour.title}</h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">{tour.description}</p>
                
                {/* Visual Mapping Pin Tags Location Items */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tour.locations.map((loc, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-slate-500">
                      <MapPin className="w-2.5 h-2.5 text-slate-400" /> {loc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lower Pricing Block Matrix */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                <div className="flex gap-4">
                  <div>
                    <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">Standard Pkg</span>
                    <span className="font-mono text-sm font-bold text-slate-800">LKR {Number(tour.prices.standard).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">Luxury Pkg</span>
                    <span className="font-mono text-sm font-bold text-emerald-600">LKR {Number(tour.prices.luxury).toLocaleString()}</span>
                  </div>
                </div>

                {/* Card Action Node Operations */}
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(tour)}
                    className="p-2 bg-slate-50 border border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-xl transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(tour.id)}
                    className="p-2 bg-slate-50 border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-xl transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* COMPILING INPUT MODAL DIALOGUE */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? "Modify Existing Tour Package Route" : "Create New Adventure Package Portfolio"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto pb-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tour Public Package Label Title</label>
            <input 
              type="text" required placeholder="e.g., Deep Jungle Udawalawe Wildlife Excursion"
              value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#a1cd3a]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Duration Length (Days)</label>
              <input 
                type="number" required min="1" max="30"
                value={form.days} onChange={e => setForm({...form, days: parseInt(e.target.value) || 1})}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Pax Allocation Limits</label>
              <input 
                type="text" required placeholder="e.g., 2 - 4 Persons max"
                value={form.pax} onChange={e => setForm({...form, pax: e.target.value})}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50/70 p-3 border border-slate-100 rounded-xl">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Standard Price (LKR)</label>
              <input 
                type="number" required min="1" placeholder="24000"
                value={form.prices.standard} onChange={e => setForm({...form, prices: { ...form.prices, standard: parseFloat(e.target.value) || '' }})}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Luxury Price (LKR)</label>
              <input 
                type="number" required min="1" placeholder="42000"
                value={form.prices.luxury} onChange={e => setForm({...form, prices: { ...form.prices, luxury: parseFloat(e.target.value) || '' }})}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Public Description Summary</label>
            <textarea 
              rows="3" required placeholder="Elaborate on detailed schedules, highlight tour values..."
              value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Locations Target Itinerary Points</label>
            <div className="flex gap-2">
              <input 
                type="text" placeholder="e.g. Ella Rock (Click Add)"
                value={locInput} onChange={e => setLocInput(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
              <button 
                type="button" onClick={addLocationTag}
                className="bg-slate-800 text-white px-4 text-xs font-bold rounded-xl hover:bg-slate-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {form.locations.map((loc, index) => (
                <span key={index} className="inline-flex items-center gap-1 text-xs bg-[#0b222c] text-white pl-2.5 pr-1.5 py-0.5 rounded-lg">
                  {loc}
                  <button type="button" onClick={() => removeLocationTag(index)} className="p-0.5 rounded-md hover:bg-white/20 text-white/70 hover:text-white border-none bg-transparent cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* UPDATED: Dynamic Local Browse File System instead of raw Text input box URL links */}
          <div className="space-y-2 bg-slate-50/70 p-3 border border-slate-100 rounded-xl">
            <label className="block text-xs font-bold text-slate-500 uppercase">Gallery Imagery (Exactly 4 Browse Slots)</label>
            <div className="grid grid-cols-2 gap-3">
              {form.images.map((imgSrc, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-2 bg-white border border-dashed border-slate-200 rounded-xl relative h-24">
                  {imgSrc ? (
                    <div className="w-full h-full relative rounded-lg overflow-hidden">
                      <img src={imgSrc} alt="Thumbnail preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImageAt(i)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors rounded-lg">
                      <Upload className="w-4 h-4 text-slate-400 mb-1" />
                      <span className="text-[10px] text-slate-500 font-medium">Slot {i + 1} Browse...</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(i, e)} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button" onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog 
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Remove Tour Package Record"
        description="Are you absolutely sure you want to scrub this adventure tour catalog entry? This operation will instantly clear it from user view calculators."
        confirmLabel="Confirm Delete"
        danger
      />

    </div>
  );
}