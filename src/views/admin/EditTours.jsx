"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "../../api/axios";

const EditTours = () => {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    details: "",
    aboutTourPackage: "",
    numberOfDays: "",
    numberOfLocations: "",
    pricePerPerson: "",
    overview: {
      tourHighlights: [""],
      whatsIncluded: [""],
      notIncluded: [""],
    },
    programme: [{ day: 1, title: "", description: "" }],
    locations: [{ name: "", imageUrl: "" }],
  });

  const [loading, setLoading] = useState(true);
  const [cardImageUrl, setCardImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // ---------------- LOAD DATA ----------------
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await api.get(`/tourpackages/get/${id}`);

        const data = res.data.data;

        setForm({
          title: data.title || "",
          imageUrl: data.imageUrl || "",
          details: data.details || "",
          aboutTourPackage: data.aboutTourPackage || "",
          numberOfDays: data.numberOfDays || "",
          numberOfLocations: data.numberOfLocations || "",
          pricePerPerson: data.pricePerPerson || "",
          overview: {
            tourHighlights: data.overview?.tourHighlights || [""],
            whatsIncluded: data.overview?.whatsIncluded || [""],
            notIncluded: data.overview?.notIncluded || [""],
          },
          programme: data.programme || [{ day: 1, title: "", description: "" }],
          locations: data.locations || [{ name: "", imageUrl: "" }],
        });
          setCardImageUrl(data.imageUrl || "");

      } catch (error) {
        console.log(error);
        toast.error("Failed to load tour data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTour();
    }
  }, [id]);

  // ---------------- BASIC CHANGE ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setForm((prev) => ({ ...prev, imageUrl: cardImageUrl }));
  }, [cardImageUrl]);

  // ---------------- IMAGE UPLOAD ----------------
  const uploadImage = async (file, setter) => {
    try {
      if (!file) return toast.error("Select image");
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("imageUpload", formData);
      const url = res?.data?.url || res?.data?.data || res?.data;
      setter(url);
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  // ---------------- OVERVIEW ----------------
  const handleOverviewChange = (section, index, value) => {
    const updated = [...form.overview[section]];
    updated[index] = value;

    setForm({
      ...form,
      overview: {
        ...form.overview,
        [section]: updated,
      },
    });
  };

  const addOverviewItem = (section) => {
    setForm({
      ...form,
      overview: {
        ...form.overview,
        [section]: [...form.overview[section], ""],
      },
    });
  };

  // ---------------- PROGRAMME ----------------
  const handleProgrammeChange = (index, field, value) => {
    const updated = [...form.programme];
    updated[index][field] = value;
    setForm({ ...form, programme: updated });
  };

  const addProgramme = () => {
    setForm({
      ...form,
      programme: [
        ...form.programme,
        { day: form.programme.length + 1, title: "", description: "" },
      ],
    });
  };

  // ---------------- LOCATIONS ----------------
  const handleLocationChange = (index, field, value) => {
    const updated = [...form.locations];
    updated[index][field] = value;
    setForm({ ...form, locations: updated });
  };

  const addLocation = () => {
    setForm({
      ...form,
      locations: [...form.locations, { name: "", imageUrl: "" }],
    });
  };

  // ---------------- SUBMIT UPDATE ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/tourpackages/update/${id}`, form);

      toast.success("Tour updated successfully!");
      router.push("/admin/tours");
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">Loading tour data...</div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Tour Package</h2>
          <button onClick={() => router.back()} className="text-xl font-bold hover:text-red-500">✖</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* BASIC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border p-3 rounded-lg text-sm"
                placeholder="Title"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500">Image</label>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadImage(e.target.files[0], setCardImageUrl)}
                  className="border p-2 rounded-lg text-sm"
                />
                {cardImageUrl && (
                  <img src={cardImageUrl} alt="preview" className="w-full h-36 object-cover rounded" />
                )}
                {isUploading && <p className="text-xs text-gray-500">Uploading...</p>}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500">Number of Days</label>
              <input
                name="numberOfDays"
                value={form.numberOfDays}
                onChange={handleChange}
                className="border p-3 rounded-lg text-sm"
                placeholder="Number of Days"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500">Price ($)</label>
              <input
                name="pricePerPerson"
                value={form.pricePerPerson}
                onChange={handleChange}
                className="border p-3 rounded-lg text-sm"
                placeholder="Price"
                required
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500">About Tour</label>
            <textarea
              name="aboutTourPackage"
              value={form.aboutTourPackage}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg h-28 text-sm"
              placeholder="About Tour"
              required
            />
          </div>

          {/* OVERVIEW */}
          <div className="grid grid-cols-3 gap-4">

            {["tourHighlights", "whatsIncluded", "notIncluded"].map((section) => (
              <div key={section}>
                <h3 className="font-semibold mb-2 text-sm uppercase text-gray-500">{section}</h3>

                {form.overview[section].map((item, i) => (
                  <input
                    key={i}
                    value={item}
                    onChange={(e) =>
                      handleOverviewChange(section, i, e.target.value)
                    }
                    className="border p-2 w-full mb-2 rounded text-sm"
                  />
                ))}

                <button
                  type="button"
                  onClick={() => addOverviewItem(section)}
                  className="text-blue-600 text-sm font-semibold"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>

          {/* PROGRAMME */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase text-gray-500">Programme</h3>

            {form.programme.map((p, i) => (
              <div key={i} className="border p-3 rounded mb-3">
                <div className="flex flex-col gap-1 mb-2">
                  <label className="text-xs text-gray-400">Day Number</label>
                  <input
                    value={p.day}
                    onChange={(e) =>
                      handleProgrammeChange(i, "day", e.target.value)
                    }
                    className="border p-2 w-full text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1 mb-2">
                  <label className="text-xs text-gray-400">Title</label>
                  <input
                    value={p.title}
                    onChange={(e) =>
                      handleProgrammeChange(i, "title", e.target.value)
                    }
                    className="border p-2 w-full text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Description</label>
                  <textarea
                    value={p.description}
                    onChange={(e) =>
                      handleProgrammeChange(i, "description", e.target.value)
                    }
                    className="border p-2 w-full text-sm h-20"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addProgramme}
              className="text-blue-600 text-sm font-semibold"
            >
              + Add Day
            </button>
          </div>

          {/* LOCATIONS */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase text-gray-500">Locations</h3>

            {form.locations.map((l, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={l.name}
                  onChange={(e) =>
                    handleLocationChange(i, "name", e.target.value)
                  }
                  className="border p-2 flex-1 text-sm rounded-lg"
                  placeholder="Location Name"
                />

                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      uploadImage(e.target.files[0], (url) => {
                        const updated = [...form.locations];
                        updated[i].imageUrl = url;
                        setForm({ ...form, locations: updated });
                      })
                    }
                    className="border p-2 w-full text-sm rounded-lg"
                  />

                  {l.imageUrl && (
                    <img src={l.imageUrl} alt={`loc-${i}`} className="mt-2 w-full h-24 object-cover rounded" />
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addLocation}
              className="text-blue-600 text-sm font-semibold"
            >
              + Add Location
            </button>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              Update Tour
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditTours;
