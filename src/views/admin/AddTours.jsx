"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const AddTours = ({onClose}) => {
  // ---------------- IMAGE STATES ----------------
  const [cardImageUrl, setCardImageUrl] = useState("");

  // ---------------- FORM STATE ----------------
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

    programme: [
      {
        day: 1,
        title: "",
        description: [""],
      },
    ],

    locations: [
      {
        name: "",
        imageUrl: "",
      },
    ],
  });

  // sync image into form
  useEffect(() => {
    setForm((prev) => ({ ...prev, imageUrl: cardImageUrl }));
  }, [cardImageUrl]);

  // ---------------- IMAGE UPLOAD ----------------
  const uploadImage = async (file, setter) => {
    try {
      if (!file) return toast.error("Select image");

      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("imageUpload", formData);
      setter(res.data.url);
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
    }
  };

  // ---------------- BASIC INPUT ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- OVERVIEW ----------------
  const handleOverview = (type, index, value) => {
    const updated = [...form.overview[type]];
    updated[index] = value;

    setForm({
      ...form,
      overview: { ...form.overview, [type]: updated },
    });
  };

  const addOverview = (type) => {
    setForm({
      ...form,
      overview: {
        ...form.overview,
        [type]: [...form.overview[type], ""],
      },
    });
  };

  // ---------------- PROGRAMME ----------------
  const handleProgramme = (index, field, value) => {
    const updated = [...form.programme];
    updated[index][field] = value;
    setForm({ ...form, programme: updated });
  };

  const addProgramme = () => {
    setForm({
      ...form,
      programme: [
        ...form.programme,
        { day: form.programme.length + 1, title: "", description: [""] },
      ],
    });
  };

  // ---------------- LOCATIONS ----------------
  const handleLocation = (index, field, value) => {
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

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        numberOfDays: Number(form.numberOfDays),
        numberOfLocations: Number(form.numberOfLocations),
        pricePerPerson: Number(form.pricePerPerson),
      };

      await api.post("tourpackages/add", payload);

      toast.success("Tour package created!");
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to create package");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-xl p-6 overflow-y-auto max-h-[90vh]">

       <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add Tour Package</h2>

            <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-red-500 text-2xl"
            >
                ✖
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* BASIC INFO */}
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="border p-2 w-full text-sm rounded-lg"
            required
          />

          <input
            type="file"
            onChange={(e) => uploadImage(e.target.files[0], setCardImageUrl)}
            className="border p-2 w-full text-sm rounded-lg"
          />

          <input
            name="details"
            placeholder="Details"
            onChange={handleChange}
            className="border p-2 w-full text-sm rounded-lg"
            required
          />

          <input
            name="aboutTourPackage"
            placeholder="About"
            onChange={handleChange}
            className="border p-2 w-full text-sm rounded-lg"
            required
          />

          <input
            name="numberOfDays"
            type="number"
            placeholder="Days"
            onChange={handleChange}
            className="border p-2 w-full text-sm rounded-lg"
            required
          />

          <input
            name="numberOfLocations"
            type="number"
            placeholder="Locations"
            onChange={handleChange}
            className="border p-2 w-full text-sm rounded-lg"
            required
          />

          <input
            name="pricePerPerson"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            className="border p-2 w-full text-sm rounded-lg"
            required
          />

          {/* OVERVIEW */}
          <div>
            <h3 className="font-bold text-sm">Highlights</h3>
            {form.overview.tourHighlights.map((h, i) => (
              <input
                key={i}
                value={h}
                onChange={(e) =>
                  handleOverview("tourHighlights", i, e.target.value)
                }
                className="border p-2 w-full my-1 text-sm rounded-lg"
              />
            ))}
            <button type="button" onClick={() => addOverview("tourHighlights")} className="text-sm text-blue-600 font-medium">
              + Add
            </button>
          </div>

          {/* PROGRAMME */}
          <div>
            <h3 className="font-bold text-sm">Programme</h3>
            {form.programme.map((p, i) => (
              <div key={i} className="border p-3 my-2 rounded-lg">
                <input
                  value={p.title}
                  placeholder="Title"
                  onChange={(e) =>
                    handleProgramme(i, "title", e.target.value)
                  }
                  className="border p-2 w-full text-sm rounded-lg"
                />

                <input
                  value={p.day}
                  type="number"
                  onChange={(e) =>
                    handleProgramme(i, "day", e.target.value)
                  }
                  className="border p-2 w-full mt-1 text-sm rounded-lg"
                />
              </div>
            ))}
            <button type="button" onClick={addProgramme} className="text-sm text-blue-600 font-medium">
              + Add Day
            </button>
          </div>

          {/* LOCATIONS */}
          <div>
            <h3 className="font-bold text-sm">Locations</h3>
            {form.locations.map((l, i) => (
              <div key={i} className="border p-3 my-2 rounded-lg">
                <input
                  placeholder="Name"
                  value={l.name}
                  onChange={(e) =>
                    handleLocation(i, "name", e.target.value)
                  }
                  className="border p-2 w-full text-sm rounded-lg"
                />

                <input
                  type="file"
                  onChange={(e) =>
                    uploadImage(e.target.files[0], (url) => {
                      const updated = [...form.locations];
                      updated[i].imageUrl = url;
                      setForm({ ...form, locations: updated });
                    })
                  }
                  className="border p-2 w-full text-sm rounded-lg mt-1"
                />
              </div>
            ))}
            <button type="button" onClick={addLocation} className="text-sm text-blue-600 font-medium">
              + Add Location
            </button>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddTours;
