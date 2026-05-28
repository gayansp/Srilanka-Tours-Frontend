import { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { Modal, ConfirmDialog } from '../../components/admin/Model';
import { toast } from 'sonner';

const INITIAL = [
  {
    id: 1,
    url: '/images/WhatsApp Image 2026-05-27 at 13.45.57.jpeg',
    caption: 'Image 1'
  },
  {
    id: 2,
    url: '/images/WhatsApp Image 2026-05-27 at 13.45.58.jpeg',
    caption: 'Image 2'
  },
  {
    id: 3,
    url: '/images/WhatsApp Image 2026-05-27 at 13.46.03.jpeg',
    caption: 'Image 3'
  },
  {
    id: 4,
    url: '/images/WhatsApp Image 2026-05-27 at 13.46.04.jpeg',
    caption: 'Image 4'
  },
  {
    id: 5,
    url: '/images/WhatsApp Image 2026-05-27 at 13.46.05.jpeg',
    caption: 'Image 5'
  },
  {
    id: 6,
    url: '/images/WhatsApp Image 2026-05-27 at 13.46.02.jpeg',
    caption: 'Image 6'
  }
];

export default function Admingaller() {
  const [photos, setPhotos] = useState(INITIAL);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const [form, setForm] = useState({
    file: null,
    preview: '',
    caption: ''
  });

  // ✅ File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({
        ...form,
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  // ✅ Add Image
  const handleAdd = (e) => {
    e.preventDefault();

    const newId = Math.max(0, ...photos.map((p) => p.id)) + 1;

    setPhotos([
      {
        id: newId,
        url: form.preview,
        caption: form.caption
      },
      ...photos
    ]);

    toast.success('Image added to gallery');

    setForm({
      file: null,
      preview: '',
      caption: ''
    });

    setIsModalOpen(false);
  };

  // ✅ Delete single
  const handleDelete = () => {
    if (deleteId !== null) {
      setPhotos(photos.filter((p) => p.id !== deleteId));
      toast.success('Image deleted');
      setDeleteId(null);
    }
  };

  // ✅ Select toggle
  const toggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  // ✅ Bulk delete
  const handleBulkDelete = () => {
    setPhotos(photos.filter((p) => !selectedIds.has(p.id)));
    toast.success(`${selectedIds.size} images deleted`);
    setSelectedIds(new Set());
    setBulkDeleteOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-text-muted">
          <span className="font-bold text-text">{photos.length}</span> images
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo) => {
          const isSelected = selectedIds.has(photo.id);

          return (
            <div
              key={photo.id}
              className={`relative rounded-2xl overflow-hidden border-2 ${
                isSelected ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-40 object-cover"
              />

              {/* Select */}
              <button
                onClick={() => toggleSelect(photo.id)}
                className="absolute top-2 left-2 w-6 h-6 bg-white rounded border"
              >
                {isSelected && '✓'}
              </button>

              {/* Delete */}
              <button
                onClick={() => setDeleteId(photo.id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}

        {/* Upload Card */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed rounded-2xl flex flex-col items-center justify-center h-40"
        >
          <Upload />
          Add Image
        </button>
      </div>

      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Image">
        <form onSubmit={handleAdd} className="space-y-4">

          {/* FILE UPLOAD */}
          <div>
            <label className="font-semibold">Upload Image</label>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="w-full mt-2"
              required
            />

            {/* PREVIEW */}
            {form.preview && (
              <img
                src={form.preview}
                alt="preview"
                className="mt-3 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          {/* CAPTION */}
          <input
            type="text"
            placeholder="Caption"
            value={form.caption}
            onChange={(e) =>
              setForm({ ...form, caption: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE SINGLE */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Image"
        description="Are you sure?"
        confirmLabel="Delete"
        danger
      />

      {/* BULK DELETE */}
      <ConfirmDialog
        isOpen={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={handleBulkDelete}
        title="Delete Selected"
        description="Delete selected images?"
        confirmLabel="Delete"
        danger
      />
    </div>
  );
}