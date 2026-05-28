import React, { useState } from 'react';
import { Car, Plus, Trash2, Edit3, Save, X, CheckCircle } from 'lucide-react';

export default function DestinationPriceManager() {
  const [notification, setNotification] = useState('');

  // 1. Core State Array for Vehicles Only
  const [vehicles, setVehicles] = useState([
    { id: 1, type: 'Standard Sedan Car', perKmRate: 90, minKm: 50 },
    { id: 2, type: 'Luxury SUV / Van', perKmRate: 140, minKm: 100 },
    { id: 3, type: 'Safari Jeep (4x4)', perKmRate: 180, minKm: 1 },
  ]);

  // 2. Form States for creating/editing items
  const [isEditing, setIsEditing] = useState(null); // stores ID of item being edited
  const [newVehicle, setNewVehicle] = useState({ type: '', perKmRate: '', minKm: '' });

  // Trigger temporary notification banners
  const triggerToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  /* =========================================
     VEHICLE RATE ACTIONS (CRUD)
     ========================================= */
  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newVehicle.type || !newVehicle.perKmRate) return;
    
    setVehicles([...vehicles, { 
      id: Date.now(), 
      type: newVehicle.type, 
      perKmRate: parseFloat(newVehicle.perKmRate),
      minKm: parseInt(newVehicle.minKm) || 0
    }]);
    setNewVehicle({ type: '', perKmRate: '', minKm: '' });
    triggerToast("Vehicle pricing rate added successfully!");
  };

  const handleDeleteVehicle = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle rate tier?")) {
      setVehicles(vehicles.filter(v => v.id !== id));
      triggerToast("Vehicle tier removed.");
    }
  };

  const handleUpdateVehicle = (id, updatedFields) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updatedFields } : v));
    setIsEditing(null);
    triggerToast("Rates updated successfully.");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-slate-800 animate-in fade-in duration-200">
      
      {/* Toast Alert Banner Notification Component */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b222c] text-white px-5 py-3 rounded-xl shadow-xl border border-white/10 flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-[#a1cd3a]" />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      {/* Header Context Summary Blocks */}
      <div className="mb-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">Rates & Pricing Matrix</h2>
        <p className="text-sm text-slate-500 mt-1">Configure active per-KM logistics calculations and fleet tier structures.</p>
      </div>

      {/* Segment Label Header */}
      <div className="flex border-b border-slate-200 mb-8">
        <div className="flex items-center gap-2 pb-4 text-sm font-bold border-b-2 border-[#a1cd3a] text-slate-900">
          <Car className="w-4 h-4" />
          Vehicle Per-KM Rates
        </div>
      </div>

      {/* Main Workspace Layout Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Hand Column Side Bar Card: Add New Rate Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-600" /> Create Rate Category
          </h3>
          <form onSubmit={handleAddVehicle} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Vehicle Fleet Name</label>
              <input 
                type="text" required placeholder="e.g., Luxury Toyota Commuter"
                value={newVehicle.type} onChange={e => setNewVehicle({...newVehicle, type: e.target.value})}
                className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Rate (LKR / KM)</label>
                <input 
                  type="number" required placeholder="120" min="1"
                  value={newVehicle.perKmRate} onChange={e => setNewVehicle({...newVehicle, perKmRate: e.target.value})}
                  className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Min Distance (KM)</label>
                <input 
                  type="number" placeholder="50" min="0"
                  value={newVehicle.minKm} onChange={e => setNewVehicle({...newVehicle, minKm: e.target.value})}
                  className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#0b222c] hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors mt-2">
              Add Fleet Tier
            </button>
          </form>
        </div>

        {/* Right Hand Main Content Column Sheet: Active Vehicle Records List Grid Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Vehicle Configuration Class</th>
                <th className="py-4 px-6">Price Per KM</th>
                <th className="py-4 px-6">Minimum Threshold</th>
                <th className="py-4 px-6 text-right">Actions Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    {isEditing === v.id ? (
                      <input 
                        type="text" defaultValue={v.type} id={`edit-v-type-${v.id}`}
                        className="p-1.5 border rounded border-slate-300 w-full font-normal"
                      />
                    ) : v.type}
                  </td>
                  <td className="py-4 px-6 font-mono text-emerald-600 font-bold">
                    {isEditing === v.id ? (
                      <input 
                        type="number" defaultValue={v.perKmRate} id={`edit-v-rate-${v.id}`}
                        className="p-1.5 border rounded border-slate-300 w-20 font-normal text-slate-900"
                      />
                    ) : `LKR ${v.perKmRate}`}
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    {isEditing === v.id ? (
                      <input 
                        type="number" defaultValue={v.minKm} id={`edit-v-min-${v.id}`}
                        className="p-1.5 border rounded border-slate-300 w-20 font-normal"
                      />
                    ) : `${v.minKm} KM`}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                    {isEditing === v.id ? (
                      <>
                        <button 
                          onClick={() => handleUpdateVehicle(v.id, {
                            type: document.getElementById(`edit-v-type-${v.id}`).value,
                            perKmRate: parseFloat(document.getElementById(`edit-v-rate-${v.id}`).value),
                            minKm: parseInt(document.getElementById(`edit-v-min-${v.id}`).value) || 0
                          })}
                          className="p-1.5 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button onClick={() => setIsEditing(null)} className="p-1.5 text-slate-400 bg-slate-100 rounded-lg">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setIsEditing(v.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteVehicle(v.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}