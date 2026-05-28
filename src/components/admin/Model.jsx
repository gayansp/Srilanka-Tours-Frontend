import React from 'react';
import { X } from 'lucide-react';

// Standard container overlay modal layout wrap
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background Dim Scrim Layer */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      
      {/* Card Content Sheet Container */}
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative z-10 p-6 space-y-4 transform scale-100 transition-transform animate-in zoom-in-95 duration-150">
        
        {/* Modal Window Top Title Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Functional Child Form Blocks Inserted Here */}
        <div className="overflow-y-auto max-h-[70vh]">
          {children}
        </div>

      </div>
    </div>
  );
}

// 2. Interactive Safe Confirmation Guard Dialog Modal
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmLabel = "Confirm", danger = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative z-10 p-6 space-y-4 animate-in zoom-in-95 duration-150">
        
        {/* Text Context Core Blocks */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>

        {/* Action Commit Row Control Matrix */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-xl text-white transition-all active:scale-[0.98] ${
              danger 
                ? 'bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/10' 
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/10'
            }`}
          >
            {confirmLabel}
          </button>
        </div>

      </div>
    </div>
  );
}