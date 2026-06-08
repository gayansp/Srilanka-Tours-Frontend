"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Clock, Edit, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "../../api/axios";
import { ConfirmDialog } from "../../components/admin/Model";

const AdminTours = () => {
  const [allTourPackages, setAllTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const router = useRouter();

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
    router.push(`/admin/tours/edit-tour/${id}`);
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
        description="Are you sure you want to delete this tour package?"
        onConfirm={handleDelete}
        onClose={handleCancel}
        isOpen={selectedId !== null}
        danger
      />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <h2 className="text-4xl font-bold">
          Tour Packages (Admin Panel)
        </h2>

        <button
          onClick={() => router.push("/admin/tours/add-tour")}
          className="mt-4 md:mt-0 flex items-center gap-2 text-green-700 bg-white border border-green-700 hover:bg-green-50 px-4 py-2 rounded-xl transition font-semibold"
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
              className="bg-white rounded-3xl overflow-hidden shadow-md border flex flex-col"
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
                    {pkg.numberOfDays} Days
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-grow">

                <p className="text-sm text-gray-600 h-[100px] overflow-y-auto mr-2">
                  {pkg.details}
                </p>

                {/* PRICE */}
                <h3 className="text-xl font-bold text-green-700 mt-3">
                  $ {pkg.pricePerPerson}
                </h3>

                {/* ACTIONS */}
                <div className="mt-auto pt-5 flex flex-col gap-3">

                  <button
                    onClick={() => router.push(`/tour-details/${pkg._id}`)}
                    className="bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between pt-2">

                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(pkg._id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    {/* DELETE (OPEN CONFIRM) */}
                    <button
                      onClick={() => openDeleteDialog(pkg._id)}
                      disabled={deletingId === pkg._id}
                      className="text-red-600 hover:text-red-800 transition disabled:opacity-50"
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