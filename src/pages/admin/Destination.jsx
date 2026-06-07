import React, { useState, useEffect } from "react";
import {
  Map, Plus, Trash2, Edit3,
  MapPin, Image as ImageIcon
} from "lucide-react";

import { Modal, ConfirmDialog } from "../../components/admin/Model";
import { toast } from "sonner";
import api from "../../api/axios";

// =========================
// EMPTY FORM
// =========================
const EMPTY_FORM = {
  title: "",
  details: "",
  address: "",
  district: "",
  image: ""
};

export default function AdminDestinations() {

  const [destinations, setDestinations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH ALL
  // =========================
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);

      const res = await api.get("/destination/all");

      const mapped = res.data.data.map((d) => ({
        id: d._id,
        title: d.name,
        details: d.description,
        address: d.address,
        district: d.district,
        image: d.imageUrl
      }));

      setDestinations(mapped);

    } catch (err) {
      toast.error("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // IMAGE UPLOAD (NEW)
  // =========================
  const uploadImage = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/imageUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.url; // backend must return {url}
    } catch (err) {
      toast.error("Image upload failed");
      return null;
    }
  };

  // =========================
  // OPEN CREATE
  // =========================
  const handleOpenCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setIsModalOpen(true);
  };

  // =========================
  // OPEN EDIT
  // =========================
  const handleOpenEdit = (dest) => {
    setForm({
      title: dest.title,
      details: dest.details,
      address: dest.address || "",
      district: dest.district || "",
      image: dest.image || ""
    });

    setEditingId(dest.id);
    setIsModalOpen(true);
  };

  // =========================
  // SUBMIT (CREATE / UPDATE)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.title,
        description: form.details,
        address: form.address,
        district: form.district,
        imageUrl: form.image
      };

      // UPDATE
      if (editingId) {
        await api.put(`/destination/update/${editingId}`, payload);

        setDestinations(destinations.map(d =>
          d.id === editingId ? { ...d, ...form } : d
        ));

        toast.success("Destination updated successfully");
      }

      // CREATE
      else {
        const res = await api.post("/destination/add", payload);

        const newDest = {
          id: res.data.data?._id || Date.now(),
          ...form
        };

        setDestinations([newDest, ...destinations]);
        toast.success("Destination created successfully");
      }

      setIsModalOpen(false);
      setForm(EMPTY_FORM);

    } catch (err) {
      toast.error("Operation failed");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/destination/delete/${deleteId}`);

      setDestinations(destinations.filter(d => d.id !== deleteId));

      toast.success("Destination deleted successfully");
      setDeleteId(null);

    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-6 border rounded-2xl">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2">
            <Map className="text-green-500" /> Destination Manager
          </h2>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          <Plus className="w-4 h-4 inline" /> Add
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {destinations.map((dest) => (
          <div key={dest.id} className="bg-white border rounded-2xl overflow-hidden">

            {/* IMAGE */}
            <div className="h-44 bg-slate-100 flex items-center justify-center">
              {dest.image ? (
                <img
                  src={dest.image}
                  alt="destination"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="text-slate-400" />
              )}
            </div>

            {/* INFO */}
            <div className="p-4 space-y-2">
              <h3 className="font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {dest.title}
              </h3>

              <p className="text-xs text-slate-500">{dest.details}</p>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => handleOpenEdit(dest)}>
                  <Edit3 className="w-4 h-4 text-blue-500" />
                </button>

                <button onClick={() => setDeleteId(dest.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Destination" : "Add Destination"}
      >
        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Name"
            className="w-full border p-2"
            required
          />

          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Address"
            className="w-full border p-2"
          />

          <input
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            placeholder="District"
            className="w-full border p-2"
          />

          <textarea
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            placeholder="Description"
            className="w-full border p-2"
            rows="4"
          />

          {/* ✅ FILE UPLOAD (NEW) */}
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2"
            onChange={async (e) => {
              const file = e.target.files[0];
              const url = await uploadImage(file);
              if (url) {
                setForm({ ...form, image: url });
                toast.success("Image uploaded");
              }
            }}
          />

          {/* PREVIEW */}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-full h-32 object-cover rounded"
            />
          )}

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      </Modal>

      {/* DELETE */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Destination?"
      />
    </div>
  );
}