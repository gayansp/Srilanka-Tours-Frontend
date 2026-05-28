import React, { useState } from 'react';
import { 
  Map, Plus, Trash2, Edit3, Star, 
  MapPin, Image as ImageIcon, X, Upload 
} from 'lucide-react';
import { Modal, ConfirmDialog } from '../../components/admin/Model';
import { toast } from 'sonner';

// Initial Mock Data starting with empty image slots (Ready for your local uploads)
const INITIAL_DESTINATIONS = [
  {
    id: 1,
    title: 'Sigiriya Ancient Rock Fortress',
    rating: 5,
    details: 'An ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. It is a site of historical and archaeological significance.',
    images: ['', '', ''] 
  },
  {
    id: 2,
    title: 'Mirissa Coastal Beach',
    rating: 4,
    details: 'Mirissa is a small town on the south coast of Sri Lanka. Mirissas beach and nightlife are well known alongside its prominent reputation as a primary whale-watching destination hotspot.',
    images: ['', '', ''] 
  }
];

const EMPTY_FORM = {
  title: '',
  rating: 5,
  details: '',
  images: ['', '', ''] 
};

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState(INITIAL_DESTINATIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const [form, setForm] = useState(EMPTY_FORM);

  const handleOpenCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dest) => {
    setForm({ ...dest });
    setEditingId(dest.id);
    setIsModalOpen(true);
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...form.images];
      updatedImages[index] = reader.result; 
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
      setDestinations(destinations.map(d => d.id === editingId ? { ...form, id: editingId } : d));
      toast.success('Destination spot details updated successfully');
    } else {
      setDestinations([{ ...form, id: Date.now() }, ...destinations]);
      toast.success('New scenic destination registered successfully');
    }
    setIsModalOpen(false);
    setForm(EMPTY_FORM);
  };

  const handleDeleteConfirm = () => {
    setDestinations(destinations.filter(d => d.id !== deleteId));
    toast.success('Destination registry entry permanently removed');
    setDeleteId(null);
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Map className="w-5 h-5 text-[#a1cd3a]" /> Destination Catalog Manager
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Register map hotspots, specify public descriptive contexts, and manage star ratings.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0b222c] hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Destination
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {destinations.map((dest) => (
          <div key={dest.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 h-44 shrink-0 relative">
              {dest.images.map((imgUrl, i) => (
                <div key={i} className="h-full w-full overflow-hidden bg-slate-200/60 border border-white/20 first:col-span-2 first:row-span-2 relative group flex items-center justify-center">
                  {imgUrl ? (
                    <img src={imgUrl} alt="Destination snapshot" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="text-slate-400 text-center flex flex-col items-center justify-center p-2">
                      <ImageIcon className="w-4 h-4 opacity-30 mb-0.5" />
                      <span className="text-[9px] text-slate-400 font-bold tracking-tight">No Image {i + 1}</span>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="absolute bottom-3 left-3 flex gap-0.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg z-10">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < dest.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} 
                  />
                ))}
              </div>
            </div>

            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-base leading-tight tracking-tight flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> {dest.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed">{dest.details}</p>
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-end gap-2 mt-auto">
                <button
                  onClick={() => handleOpenEdit(dest)}
                  className="p-2 bg-slate-50 border border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-xl transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(dest.id)}
                  className="p-2 bg-slate-50 border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-xl transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? "Modify Destination Properties" : "Register Fresh Scenic Spot Location"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto pb-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Destination Name Location</label>
              <input 
                type="text" required placeholder="e.g., Ella Rock"
                value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">User Rate Level (Stars)</label>
              <div className="flex items-center gap-1 bg-slate-50 h-[38px] px-3 border border-slate-200 rounded-xl">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setForm({ ...form, rating: num })}
                    className="p-0.5 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-4 h-4 ${num <= form.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Location Details</label>
            <textarea 
              rows="4" required placeholder="Provide structured cultural facts and details..."
              value={form.details} onChange={e => setForm({...form, details: e.target.value})}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2 bg-slate-50/70 p-3 border border-slate-100 rounded-xl">
            <label className="block text-xs font-bold text-slate-500 uppercase">Gallery Showcase (Exactly 3 Browse Slots)</label>
            <div className="grid grid-cols-3 gap-2">
              {form.images.map((imgSrc, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-1 bg-white border border-dashed border-slate-200 rounded-xl relative h-24">
                  {imgSrc ? (
                    <div className="w-full h-full relative rounded-lg overflow-hidden">
                      <img src={imgSrc} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImageAt(i)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors rounded-lg">
                      <Upload className="w-3.5 h-3.5 text-slate-400 mb-0.5" />
                      <span className="text-[9px] text-slate-500 font-medium">Slot {i + 1}</span>
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
        title="Remove Destination Hub Record"
        description="Are you sure you want to clean out this destination file directory? Doing so will scrub the details and associated image array structures instantly."
        confirmLabel="Confirm Delete"
        danger
      />

    </div>
  );
}