import { useEffect, useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { Modal, ConfirmDialog } from '../../components/admin/Model';
import { toast } from 'sonner';
import api from '../../api/axios';
import ErrorPage from '../ErrorPage';

export default function Admingaller() {
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [isError, setIsError] = useState(false);

  // ─── Fetch Gallery ───────────────────────────────────────────────────────────
  const fetchGallery = async () => {
    try {
      const response = await api.get("gallery/get");
      setPhotos(response.data.galleryImages);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast.error('Something went wrong');
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ─── File Upload Handler ─────────────────────────────────────────────────────
  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setPreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post("imageUpload", formData);
      
      setImageUrl(response.data.url);
      toast.success('Image uploaded successfully');

    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
      toast.error('Failed to upload image');
      setIsError(true);
    }
  };

  // ─── Add Image ───────────────────────────────────────────────────────────────
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error('Please upload an image first');
      return;
    }

    try {
      setIsLoading(true);
      await api.post("gallery/add", { image: imageUrl });
      toast.success('Image added to gallery');

      // Reset & refresh
      setImageUrl('');
      setPreview('');
      setIsModalOpen(false);
      await fetchGallery();

    } catch (error) {
      console.error('Error adding image:', error.response?.data || error.message);
      toast.error('Failed to add image');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Delete Image ────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    try {
      if (deleteId !== null) {
        await api.delete(`gallery/delete/${deleteId}`);
        toast.success('Image deleted successfully!');
        setDeleteId(null);
        await fetchGallery();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
      setIsError(true);
    }
  };

  // ─── Close Modal (reset state) ───────────────────────────────────────────────
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImageUrl('');
    setPreview('');
  };

  // ─── Render ──────────────────────────────────────────────────────────────────


  if (isError) {
    return <ErrorPage />;
  }

 

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
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="relative rounded-2xl overflow-hidden border-2 border-transparent"
          >
            <img
              src={photo.image}
              alt="gallery"
              className="w-full h-40 object-cover"
            />

            {/* Delete Button */}
            <button
              onClick={() => setDeleteId(photo._id)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Upload Card */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed rounded-2xl flex flex-col items-center justify-center h-40 gap-2 text-sm text-gray-500"
        >
          <Upload className="w-6 h-6" />
          Add Image
        </button>
      </div>

      {/* ADD IMAGE MODAL */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Image">
        <form onSubmit={handleAdd} className="space-y-4">

          {/* File Input */}
          <div>
            <label className="font-semibold block mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
              required
            />
          </div>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading || !imageUrl}
              className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add to Gallery'}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRM DIALOG */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Image"
        description="Are you sure you want to delete this image?"
        confirmLabel="Delete"
        danger
      />

    </div>
  );
}