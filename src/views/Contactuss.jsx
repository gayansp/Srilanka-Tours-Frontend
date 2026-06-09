"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '../components/Home/FadeIn';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(e.target);

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const fullMessage = `
🆕 *New Contact Form Message*

👤 Name: ${firstName} ${lastName}
📧 Email: ${email}
📌 Subject: ${subject}

💬 Message:
${message}
  `;

  const whatsappUrl = `https://wa.me/94706000344?text=${encodeURIComponent(fullMessage)}`;

  setTimeout(() => {
    setIsSubmitting(false);
    window.open(whatsappUrl, "_blank");
    e.target.reset();
  }, 600);
};

  return (
    <section id="contact" className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-4">
            Start Planning Your Sri Lanka Tour
          </h2>
          <p className="text-text-muted text-lg">
            Contact SL Travels for Udawalawa tours, Ella travels, and bespoke Ceylon safari bookings.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* LEFT SIDE */}
          <FadeIn direction="right">
            <div className="space-y-10">

              {/* ADDRESS */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-primary">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Visit Our Office</h4>
                  <p className="text-gray-600">
                    Udawalawa, Sri Lanka<br />
                    (Near Udawalawa National Park)
                  </p>
                </div>
              </div>

              {/* PHONE + WHATSAPP */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-primary">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Call / WhatsApp</h4>
                  <p className="text-gray-600">
                    +94 70 600 0344<br />
                    
                  </p>

                  
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-primary">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Email</h4>
                  <p className="text-gray-600">
                    toursudawalawa@gmail.com<br />
                    www.udawalawatours.com
                  </p>
                </div>
              </div>

              {/* MAP */}
              <div className="w-full h-64 rounded-3xl overflow-hidden relative border">
                <iframe
                  title="Udawalawe National Park"
                  src="https://www.google.com/maps?q=6.4383,80.8883&z=13&output=embed"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href="https://www.google.com/maps?q=6.4383,80.8883"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white px-6 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Google Maps
                  </a>
                </div>
              </div>

            </div>
          </FadeIn>

          {/* RIGHT SIDE FORM */}
          <FadeIn direction="left">
            <div className="bg-white p-8 rounded-3xl shadow-lg">

              <h3 className="text-2xl font-bold mb-6">Send Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">

                <input
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <input
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <select
                  name="subject"
                  className="w-full px-4 py-3 border rounded-xl"
                >
                  <option>General Inquiry</option>
                  <option>Custom Tour Request</option>
                  <option>Vehicle Booking</option>
                </select>

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Message"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send className="w-5 h-5" />}
                </button>

              </form>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}