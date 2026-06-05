import React from 'react';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
import {
  Compass,
  Heart,
  Globe,
  Award,
  Users,
  Leaf,
  Mountain,
  ArrowRight,
  Quote,
  CheckCircle2
} from 'lucide-react';
import { Calculator } from '../components/Home/Calculator';
import { FadeIn } from '../components/Home/FadeIn';

const VALUES = [
  {
    icon: Heart,
    title: 'Authenticity',
    desc: 'We share the real Sri Lanka — the warmth of its people, the wisdom of its traditions, and the soul of its landscapes.'
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    desc: 'We design tours that protect the environment, support local communities, and preserve cultural heritage for future generations.'
  },
  {
    icon: Users,
    title: 'Community First',
    desc: 'A portion of every booking funds local schools, conservation projects, and small businesses across the island.'
  },
  {
    icon: Award,
    title: 'Excellence',
    desc: 'From licensed guides to handpicked accommodations, every detail is crafted to exceed expectations.'
  }
];

const TEAM = [
  {
    name: 'Mayura sandeep',
    role: 'Founder & Lead Guide',
    bio: 'Born in the hill country, Kasun has been guiding travelers for over 15 years.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
  },
  {
    name: 'Priya Fernando',
    role: 'Operations Director',
    bio: 'A logistics expert who ensures every journey runs seamlessly from start to finish.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
  },
  {
    name: 'Dilan Perera',
    role: 'Cultural Specialist',
    bio: 'An archaeologist by training, Dilan brings ancient sites and stories to life.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop'
  },
  {
    name: 'Anushka Silva',
    role: 'Guest Experience',
    bio: 'Your go-to person for crafting personalized, dream Sri Lankan itineraries.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop'
  }
];

const MILESTONES = [
  {
    year: '2014',
    title: 'A Humble Beginning',
    desc: 'Founded by Kasun with a single van and a dream to share Sri Lanka with the world.'
  },
  {
    year: '2017',
    title: 'First 1,000 Travelers',
    desc: 'Welcomed our 1,000th guest and expanded our fleet to 12 vehicles.'
  },
  {
    year: '2019',
    title: 'Sustainable Tourism Award',
    desc: 'Recognized by Sri Lanka Tourism Board for our community impact initiatives.'
  },
  {
    year: '2022',
    title: 'Global Recognition',
    desc: 'Featured in Lonely Planet and Condé Nast Traveller as a top local operator.'
  },
  {
    year: '2025',
    title: '15,000+ Memories',
    desc: 'Today, we proudly serve travelers from over 60 countries each year.'
  }
];

const STATS = [
  {
    value: '10+',
    label: 'Years of Experience'
  },
  {
    value: '15k+',
    label: 'Happy Travelers'
  },
  {
    value: '60+',
    label: 'Countries Served'
  },
  {
    value: '50+',
    label: 'Local Partners'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans text-text">
      

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/public/images/LK710AA01F-03-E.webp"
            alt="Sri Lankan tea fields"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <FadeIn delay={0.1}>
              <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-white border border-accent/30 backdrop-blur-md font-medium text-sm mb-6">
                Our Story
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                Crafting Journeys, <br />
                <span className="italic text-accent">Sharing Sri Lanka</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                For over a decade, we've been more than a travel agency — we're
                storytellers, cultural ambassadors, and proud custodians of the
                most beautiful island on earth.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-3 block">
                Where it all began
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">
                A love letter to our homeland
              </h2>
              <div className="space-y-5 text-text-muted leading-relaxed text-lg">
                <p>
                  Udawala Tours was born in 2014 in a small village near the
                  Udawalawe National Park. Our founder, Kasun, grew up watching
                  travelers pass through his hometown — captivated by elephants
                  and tea fields but often missing the deeper stories that made
                  Sri Lanka truly extraordinary.
                </p>
                <p>
                  He started with one van, a notebook full of hidden gems, and
                  an unshakable belief that travel should connect people, not
                  just transport them. A decade later, that same belief drives
                  everything we do.
                </p>
                <p>
                  Today, we're a team of 30+ guides, drivers, and travel
                  designers — all locals, all storytellers, all passionate about
                  showing you the Sri Lanka we love.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
                <img
                  src="public/images/WhatsApp Image 2026-05-27 at 13.46.05.jpeg"
                  alt="Founder signature"
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                />
                <div>
                  <div className="font-serif text-xl font-bold text-text">
                    Mayura Sandeep
                  </div>
                  <div className="text-sm text-text-muted">Founder & CEO</div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="public/images/WhatsApp Image 2026-05-27 at 13.46.02.jpeg"
                    alt="Sri Lankan landscape"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                  <Quote className="w-8 h-8 text-accent mb-3" />
                  <p className="text-text italic text-sm leading-relaxed">
                    "We don't sell tours. We share the soul of Sri Lanka — one
                    journey at a time."
                  </p>
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center">
                <div className="font-serif text-5xl md:text-6xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">
              What drives us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text">
              Mission & Vision
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn direction="right">
              <div className="bg-white p-10 rounded-3xl shadow-soft border border-gray-100 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-text mb-4">
                  Our Mission
                </h3>
                <p className="text-text-muted leading-relaxed text-lg">
                  To craft transformative travel experiences that celebrate Sri
                  Lanka's rich heritage, support local communities, and forge
                  lasting bonds between our guests and the island we call home.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="bg-white p-10 rounded-3xl shadow-soft border border-gray-100 h-full">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-text mb-4">
                  Our Vision
                </h3>
                <p className="text-text-muted leading-relaxed text-lg">
                  To be Sri Lanka's most trusted travel partner — known not just
                  for unforgettable journeys, but for our deep commitment to
                  people, planet, and authentic storytelling.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">
              Our Principles
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-4">
              What We Stand For
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Four guiding values that shape every itinerary, every
              conversation, and every connection we make.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <FadeIn key={i} delay={i * 0.1} fullWidth>
                  <div className="p-8 rounded-3xl bg-background border border-gray-100 h-full transition-transform hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-text mb-3">
                      {value.title}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      

      

      {/* Why Travelers Choose Us */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/public/images/pk.jpg"
                  alt="Sri Lankan stilt fishermen"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-3 block">
                Why travelers trust us
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">
                More than a tour — it's a connection
              </h2>
              <p className="text-text-muted leading-relaxed text-lg mb-8">
                We're proud of what makes us different: a small enough team to
                remember your name, but experienced enough to handle every
                detail flawlessly.
              </p>

              <div className="space-y-4">
                {[
                  '100% locally-owned and operated since day one',
                  'Licensed by the Sri Lanka Tourism Development Authority',
                  'Sustainable Tourism Award recipient (2019, 2022)',
                  '24/7 on-trip support, no matter where you are',
                  'Transparent pricing with zero hidden fees'
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                    <span className="text-text">{point}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="public/images/mklh.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <Mountain className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to write your Sri Lankan story?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's craft a journey that matches your pace, your interests, and
              your dreams. Our team is just one conversation away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-accent/30"
              >
                Plan Your Trip
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-lg backdrop-blur-md transition-all border border-white/20"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      

    </div>
  );
}