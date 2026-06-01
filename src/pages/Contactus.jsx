import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '../components/Home/FadeIn';
import { toast } from 'sonner';
import Header from '../components/Home/Header';


export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message Sent!', {
        description: 'Thank you for reaching out. We will get back to you within 24 hours.',
        icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
      });
      e.target.reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <Header />
        <FadeIn className="text-center mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">
            Get in Touch
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-4">
            Start Planning Your Trip
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Have questions about our tours or need a custom itinerary? Our
            travel experts are here to help.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <FadeIn direction="right">
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-text mb-2">
                    Visit Our Office
                  </h4>
                  <p className="text-text-muted leading-relaxed">
                    123 Temple Road,
                    <br />
                    Colombo 03, Sri Lanka
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-text mb-2">
                    Call Us
                  </h4>
                  <p className="text-text-muted leading-relaxed">
                    Main: +94 77 123 4567
                    <br />
                    WhatsApp: +94 71 987 6543
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-text mb-2">
                    Email Us
                  </h4>
                  <p className="text-text-muted leading-relaxed">
                    hello@udawalatours.com
                    <br />
                    bookings@udawalatours.com
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-gray-100 rounded-3xl overflow-hidden relative mt-8 border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                  alt="Map"
                  className="w-full h-full object-cover opacity-50 grayscale"
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-6 py-3 rounded-full shadow-lg font-semibold text-primary text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    View on Google Maps
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="left">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-soft border border-gray-100">
              <h3 className="font-serif text-2xl font-bold text-text mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none">
                    <option>General Inquiry</option>
                    <option>Custom Tour Request</option>
                    <option>Vehicle Booking</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
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