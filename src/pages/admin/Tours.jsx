import React, { useEffect, useState } from "react";
import { ArrowRight, Clock, Edit, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { ConfirmDialog } from "../../components/admin/Model";

const AdminTours = () => {
  const [allTourPackages, setAllTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: separate states
  const [selectedId, setSelectedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  // ---------------- FETCH ----------------
  const getTourPackages = async () => {
    try {
      const response = await api.get("/tourpackages/all");

      setAllTourPackages(
        response.data.data || response.data.date || []
      );
    } catch (error) {
      console.error("Error fetching tour packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTourPackages();
  }, []);

  // ---------------- OPEN CONFIRM ----------------
  const openDeleteDialog = (id) => {
    setSelectedId(id);
  };

  // ---------------- CANCEL ----------------
  const handleCancel = () => {
    setSelectedId(null);
  };

  // ---------------- CONFIRM DELETE ----------------
  const handleDelete = async () => {
    try {
      setDeletingId(selectedId);

      await api.delete(`/tourpackages/delete/${selectedId}`);

      setAllTourPackages((prev) =>
        prev.filter((pkg) => pkg._id !== selectedId)
      );

      setSelectedId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // ---------------- EDIT ----------------
  const handleEdit = (id) => {
    navigate(`/admin/edit-tour/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium">
        Loading Tour Packages...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">

      {/* CONFIRM DIALOG */}
      <ConfirmDialog
        title="Confirm Deletion"
        message="Are you sure you want to delete this tour package?"
        onConfirm={handleDelete}
        onCancel={handleCancel}
        isOpen={selectedId !== null}
        loading={deletingId !== null}
      />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <h2 className="text-4xl font-bold">
          Tour Packages (Admin Panel)
        </h2>

        <button
          onClick={() => navigate("/admin/add-tour")}
          className="mt-4 md:mt-0 flex items-center gap-2 text-green-700"
        >
          <Plus className="w-5 h-5" />
          Add Tour
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {Array.isArray(allTourPackages) &&
          allTourPackages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-3xl overflow-hidden shadow-md border"
            >

              {/* IMAGE */}
              <div className="relative h-64">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-lg flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    {pkg.title}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <p className="text-sm text-gray-600 h-[100px] overflow-y-auto">
                  {pkg.details}
                </p>

                {/* PRICE */}
                <h3 className="text-xl font-bold text-green-700 mt-3">
                  Rs. {pkg.pricePerPerson}
                </h3>

                {/* ACTIONS */}
                <div className="mt-5 flex flex-col gap-3">

                  <button
                    onClick={() => navigate(`/tour-details/${pkg._id}`)}
                    className="bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between">

                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(pkg._id)}
                      className="text-blue-600"
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    {/* DELETE (OPEN CONFIRM) */}
                    <button
                      onClick={() => openDeleteDialog(pkg._id)}
                      disabled={deletingId === pkg._id}
                      className="text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    {deletingId === pkg._id && (
                      <span className="text-xs text-gray-500">
                        Deleting...
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminTours;